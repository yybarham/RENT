import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/objects';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-return-car',
  templateUrl: './return-car.component.html',
  styleUrls: ['./return-car.component.css']
})
export class ReturnCarComponent implements OnInit {

  selectedOrder: Order;
  returnDate: Date;
  data: string = '';


  constructor(private httpService: HttpService) { }
  msgid = 0;
  ngOnInit() {
  }

  onDateChange(event: any) {
    this.returnDate = new Date(event.value);
    this.msgid = 0;
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
    order.Payed = 99;
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
  displayCounter(selected: Order) {
    this.selectedOrder = selected;
  }

}
