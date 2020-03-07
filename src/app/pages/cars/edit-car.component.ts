import { Component, OnInit } from '@angular/core';

/////////////////////////////////////////////////
// THIS IS COMPONENT FOR ADMIN TO START EDIT CAR
///////////////////////////////////////////////////

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  isEdit = true;
  
  constructor() { }

  ngOnInit() {
  }

}
