import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Car } from 'src/app/model/objects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];
  chosen = '';
  clicked = false;
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.httpService.getCars().subscribe(res => {
      this.cars = res;
    });
  }

  choose(carid) {
    this.chosen = carid;
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
}
