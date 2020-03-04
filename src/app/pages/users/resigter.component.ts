import { Component, OnInit } from '@angular/core';

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
