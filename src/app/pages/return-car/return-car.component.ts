import { Component, OnInit } from '@angular/core';
import { Order, Car, CarType } from 'src/app/model/objects';
import { HttpService } from 'src/app/services/http.service';

//////////////////////////////////////////////////
// THIS COMPONENT ENABLES AN EMPLOYEE TO RETURN A CAR
// IT USES INNER COMPONENT <app-orders> TO SHOW LIST OF ORDER 
// FIRST: NEED TO CHOOSE A CAR
// THE USER CAN SEARCH A CAR BY CLICKING THE NUMBER OF CAR OR PART OF IT
// THEN CLICK "RETURN CAR" ON THE SELECTED ROW
// THAN NEED TO ADD DATE TO RETURN
// THE DATE MUST BE GREATER THAN THE STARTING DATE OF RENTAL 
// AND THEN - THE CAR BECAME FREE TO USED BY ANOTHER USER
//////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-return-car',
  templateUrl: './return-car.component.html',
  styleUrls: ['./return-car.component.css']
})
export class ReturnCarComponent implements OnInit {

  selectedOrder: Order;
  returnDate: Date;
  data: string = '';
  cars: Car[] = [];
  cartypes: CarType[] = [];
  dailyCost = 0;
  totalDays = 0;
  totalToPay = 0;
  minDate1 = new Date();

  constructor(private httpService: HttpService) {
    // GET ALL CAR FROM DB
    this.httpService.getCars().subscribe(res => {
      this.cars = res;
      // GET CAR TYPE DATA TO SHOW PRICE AND PENALTY
      this.httpService.getCarType().subscribe(res2 => {
        this.cartypes = res2;
      });
    });
  }
  msgid = 0;
  ngOnInit() {
  }

  onDateChange(event: any) {
    this.returnDate = new Date(event.value);
    this.msgid = 0;
    this.totalDays = Math.abs(this.diffDate(this.returnDate, new Date(this.selectedOrder.StartDate)));
    this.totalToPay = this.totalDays * this.dailyCost;
  }

  returnCar() {
    if (this.selectedOrder == null) {
      this.msgid = 1;
      return;
    }
    if (this.returnDate == null) {
      this.msgid = 2;
      return;
    }
    this.msgid = 0;
    const order = new Order();
    order.OrderId = this.selectedOrder.OrderId;
    order.ActualDate = this.returnDate;
    order.Payed = this.totalToPay;
    
    this.httpService.returnCar(order).subscribe(res => {
      if (res) {
        this.selectedOrder = null;
        this.msgid = 3;
        this.data = new Date().toString();
      } else {
        this.msgid = 4;
      }
    });
  }
  evetFromChild(selected: Order) {

    this.selectedOrder = selected;
    const selectedNumber = this.selectedOrder.Number;
    const carType = this.cars.filter(c => c.Number == selectedNumber)[0].CarType;
    this.dailyCost = this.cartypes.filter(t => t.Id == carType)[0].DailyCost;
    this.minDate1 = new Date(this.selectedOrder.StartDate);
    this.minDate1.setDate(this.minDate1.getDate()+1);

  }
  diffDate(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

}
