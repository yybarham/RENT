import { Component, OnInit } from '@angular/core';
import { CarType } from 'src/app/model/objects';
import { HttpService } from 'src/app/services/http.service';

///////////////////////////////////////////////////
// THIS COMPONENT SHOW ALL CAR TYPE FOR ADMIN ONLY
/////////////////////////////////////////////////////


@Component({
  selector: 'app-car-type',
  templateUrl: './car-type.component.html',
  styleUrls: ['./car-type.component.css']
})
export class CarTypeComponent implements OnInit {

  carsType: CarType[] = [];

  constructor(private httpService: HttpService) {

  }

  ngOnInit() {
    this.httpService.getCarType().subscribe(res => {
      this.carsType = res;
    });
  }
}
