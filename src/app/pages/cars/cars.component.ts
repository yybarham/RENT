import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Car, CarType } from 'src/app/model/objects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];
  carTypes: CarType[] = [];
  joinData: any[] = [];
  chosen = '';
  img = '';
  clicked = false;
  // search
  all = '';
  manufacturer = '';
  year = '';
  gear = -1;
  edit = false;
  selectedCar: Car;
  history: string[] = [];


  comboGear = [
    { key: -1, value: 'CHOOSE' },
    { key: 1, value: 'AUTO' },
    { key: 2, value: 'MANU' },
  ];

  constructor(private httpService: HttpService, private router: Router) {


    const his = localStorage.getItem('history');
    if (his) {
      this.history = JSON.parse(his);
    }

  }

  ngOnInit() {
    this.getCars();

  }
  getCars() {
    this.httpService.getCars().subscribe(res => {
      this.cars = res;
      this.httpService.getCarType().subscribe(res2 => {
        this.carTypes = res2;
        this.joinData = this.innerJoin(this.carTypes, this.cars,
          ({ Id, Manufacturer, Model, Year, GearType }, { Number, CarType, Mileage, Branch, Image, selected }) =>
            CarType === Id && { Number, CarType, Model, Mileage, Id, Manufacturer, GearType, Year, Branch, Image, selected });
      });
    });

  }

  choose(number, fromHistory = false) {

    if (!fromHistory) {
      if (this.history.indexOf(number) < 0) {
        this.history.unshift(number);
        this.history.splice(5);
        localStorage.setItem('history', JSON.stringify(this.history));
      }
    }

    this.edit = false;
    this.chosen = number;
    this.img = this.cars.filter(c => c.Number === number)[0].Image;
    this.joinData.forEach(c => c.selected = false);
    this.joinData.filter(c => c.Number === number)[0].selected = true;
  }

  next() {
    this.clicked = true;
    if (this.chosen) {
      localStorage.setItem('chosen', this.chosen);
      this.router.navigate(['new-order']);
    }
  }

  newCar() {
    this.selectedCar = new Car();
    this.selectedCar.Number = '000000000';
    this.selectedCar.IsNew = true;
    this.edit = true;
  }

  event1() {
    this.getCars();
    this.edit = false;
  }

  editCar(number) {
    this.selectedCar = this.cars.filter(u => u.Number === number)[0];
    this.selectedCar.IsNew = false;
    this.edit = true;
    this.joinData.forEach(c => c.selected = false);
    this.joinData.filter(c => c.Number === number)[0].selected = true;
    this.img = this.cars.filter(c => c.Number === number)[0].Image;
  }

  deleteCar(number) {
    if (confirm('Are you sure ?')) {

      this.httpService.DeleteCar(number).subscribe(res => {
        if (res) {
          this.getCars();
        }
      });
    }
  }

  public innerJoin = (xs, ys, sel) => xs.reduce((zs, x) => ys.reduce((zs, y) => zs.concat(sel(x, y) || []), zs), []);



}
