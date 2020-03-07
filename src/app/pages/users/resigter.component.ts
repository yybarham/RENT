import { Component, OnInit } from '@angular/core';

/////////////////////////////////////////////////////
// THIS FORM IS USED TO ENABLE NEW USERS TO REGISTER
// ITS USE INNER COMPONENT <app-new-user> TO REQUEST FOR NEW USER
// VALIDATION IS EXIST FOR ANY FIELD
// USER CAN ADD ANY VALID VALUE IN THE FORM EXCEPT THE USERNAME WHICH IS UNIQU
// IS RESULT FROM REGIST IS -1 THE USERNAME IS ALREADY EXIST IN DB 
/////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-resigter',
  templateUrl: './resigter.component.html',
  styleUrls: ['./resigter.component.css']
})
export class ResigterComponent implements OnInit {

  constructor() { }
  show = true;
  ngOnInit() {
  }
  eventFromChild(){
    this.show = false;
  }

}
