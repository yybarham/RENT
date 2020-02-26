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


  comboGear = [
    { key: -1, value: 'CHOOSE' },
    { key: 1, value: 'AUTO' },
    { key: 2, value: 'MANU' },
  ];

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
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

  choose(carid) {
    this.chosen = carid;
    this.img = this.cars.filter(c => c.Number === carid)[0].Image;
    this.joinData.forEach(c => c.selected = false);
    this.joinData.filter(c => c.Number === carid)[0].selected = true;
  }

  next() {
    this.clicked = true;
    if (this.chosen) {
      localStorage.setItem('chosen', this.chosen);
      this.router.navigate(['new-order']);
    }
  }

  public innerJoin = (xs, ys, sel) => xs.reduce((zs, x) => ys.reduce((zs, y) => zs.concat(sel(x, y) || []), zs), []);

}
