import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/objects';
import { HttpService } from 'src/app/services/http.service';
import { LoginGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  orders: Order[] = [];
  constructor(private httpService: HttpService, private loginGuardService: LoginGuardService) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    const myUserName = this.loginGuardService.logged
    this.httpService.getOrders().subscribe(res => {
      this.orders = res;
      this.orders = this.orders.filter(o => o.UserName === myUserName);
      //this.orders.sort(this.sort);
    });
  }

}