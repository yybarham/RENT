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

  chosen = '';
  img = '';
  clicked = false;
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.httpService.getCars().subscribe(res => {
      this.cars = res;
      this.httpService.getCarType().subscribe(res2 => {
        this.carTypes = res2;
        const joinData = this.innerJoin(this.carTypes, this.cars,
          ({ Id, Manufacturer }, { Number, CarType, Mileage }) =>
            CarType === Id && { Number, CarType, Mileage, Id, Manufacturer });

        //Number,  CarType,  Isvalid,  IsFree,  Mileage,  Branch,  Image,  IsNew,  selected
        //------------------  
        //Id,  Manufacturer,  Model,  DailyCost,  DailyPenalty,  Year,  GearType
          console.table(joinData);
      });
    });
  }

  choose(carid) {
    this.chosen = carid;
    this.img = this.cars.filter(c => c.Number === carid)[0].Image;
    this.cars.forEach(c => c.selected = false);
    this.cars.filter(c => c.Number === carid)[0].selected = true;
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
