import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from 'src/app/model/objects';
import { HttpService } from 'src/app/services/http.service';
///////////////////////////////////////////
// THIS COMPONENT DISPLAY LIST OF ALL ORDERS
// ITS INNER COMPONENT FOR ADMIN TO SEARCH AND EDIT/DELETE/ ORDER
// AND ALSO FOR EMPLOYYE TO RETURN CAR FROM ORDER
//////////////////////////////////////////////////////


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnChanges {
  @Output() valueChange = new EventEmitter();
  @Input() action
  @Input() data: string;

  orders: Order[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getOrders();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.getOrders();
    }
  }

  getOrders() {
    this.httpService.getOrders().subscribe(res => {
      this.orders = res;
      if (this.action == 'return-car') {
        this.orders = this.orders.filter(o => o.ActualDate == null);
      }
      this.orders.sort(this.sort);
    });
  }
  choose(orderid) {
    const selected: Order = this.orders.filter(o => o.OrderId === orderid)[0];
    this.valueChange.emit(selected);
  }

  sort(a, b) {
    return b["OrderId"] - a["OrderId"];
  };

  delete(orderid) {

    if (confirm('Are you sure ?')) {
      this.httpService.deleteOrder(orderid).subscribe(res => {
        if (res) {
          this.getOrders();
        }
      });
    }

  }

  edit(orderid) {
    const selected: Order = this.orders.filter(o => o.OrderId === orderid)[0];
    this.valueChange.emit(selected);
  }

}
