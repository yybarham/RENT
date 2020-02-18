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
  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  onDateChange(event: any) {
    this.returnDate = new Date(event.value);
  }

  returnCar() {
    const order = new Order();
    order.OrderId = this.selectedOrder.OrderId;
    order.ActualDate = this.returnDate;
    order.Payed = 99;
    this.httpService.returnCar(order).subscribe(res => {
      alert(res);
    });
  }
  displayCounter(selected: Order) {
    this.selectedOrder = selected;
  }

}
