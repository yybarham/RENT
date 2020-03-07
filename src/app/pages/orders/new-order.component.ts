import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Order, CarType } from 'src/app/model/objects';
import { ThrowStmt } from '@angular/compiler';
import { UserGuardService } from 'src/app/services/auth-guard.service';
//////////////////////////////////////////////////
// THIS COMPONENT ALLOW USER PLACE CAR ORDER
// HE CAME TO THIS FORM AFTER CHOOSING A CAR FROM CAR LIST
// THE CAR IS SAVE ON LOCALSTORAGE ON CAR COMPONENT
// THEN CHOOSE THE DATE 
// THAN PLACE THE ORDER AFTER CONFIGTM
//////////////////////////////////////////////////////////

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  isOK = false;
  isNOK = false;
  chosen = '';
  days = 0;
  price = 0;
  minDate1 = new Date();
  minDate2 = new Date();
  current_order = new Order();
  carTypes: CarType[] = [];
  selectedType: CarType;
  constructor(private httpService: HttpService, private userGuardService:UserGuardService ) {
    this, httpService.getCarType().subscribe(res => {
      this.carTypes = res;
      console.log(this.carTypes);
      this.chosen = localStorage.getItem('chosen_number');
      const chosen_type = localStorage.getItem('chosen_type');
      this.selectedType = this.carTypes.filter(t => t.Id === +chosen_type)[0];
    });
  }

  ngOnInit() {

  }

  calculate() {
    this.price = this.days * this.selectedType.DailyCost;
  }

  placeOrder() {

    if (this.price > 0) {
      if (confirm('Are you sure ?')) {
        this.current_order.ActualDate = null;
        this.current_order.UserName = this.userGuardService.logged;
        this.current_order.Number = this.chosen;
        console.log(100, this.current_order)
        this.current_order.IsNew = true;
        this.httpService.saveOrder(this.current_order).subscribe(res => {
          this.isOK = res;
          this.isNOK = !res;
        });
      }
    }
  }

  onDateChange(event, id) {

    const selected: Date = new Date(event.value);
    selected.setDate(selected.getDate() + 1);
    if (id === 1) {
      this.current_order.StartDate = selected;
      this.minDate2 = selected;
    } else {
      this.current_order.EndDate = selected;
    }

    if (this.current_order.StartDate && this.current_order.EndDate) {
      const diff = (this.current_order.EndDate.getTime() - this.current_order.StartDate.getTime()) / (1000 * 60 * 60 * 24);
      this.days = diff + 1;
      if (this.days > 0) {
        this.calculate();
      }
    }
  }


}
