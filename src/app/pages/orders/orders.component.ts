import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/model/objects';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @Output() valueChange = new EventEmitter();

  orders: Order[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getOrders().subscribe(res => {
      this.orders = res;
    });
  }
  choose(orderid) {
    const selected: Order = this.orders.filter(o => o.OrderId === orderid)[0];
    this.valueChange.emit(selected);
  }

}
