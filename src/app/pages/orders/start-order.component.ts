import { Component, OnInit } from '@angular/core';

////////////////////////////////////////
// THIS COMPONENT START ORDER SESSION
// ITS USE INNER COMPONENT <app-cars> TO SHOW CAR LIST WITH SEARCH OPTIONS
// THE USER NEED TO SELECT A CAR AND MOVE TO NEXT PAGE
// TO SELECT DATES
// THE USER MUST CONFIRM BEFORE ORDER
//////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-start-order',
  templateUrl: './start-order.component.html',
  styleUrls: ['./start-order.component.css']
})
export class StartOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
