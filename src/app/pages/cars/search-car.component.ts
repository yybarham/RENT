import { Component, OnInit } from '@angular/core';


//////////////////////////////////////////////
// THIS COMPONENT IS A CONTAINER FOR GUEST TO MAKE
// SEARCH FOR CAR AND CALCULATE PRICE
//////////////////////////////////////////////

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {

  isEdit = false;
  constructor() { }

  ngOnInit() {
  }

}
