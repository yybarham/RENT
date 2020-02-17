import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Order } from 'src/app/model/objects';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  isOK = false;
  isNOK = false;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  placeOrder() {

    const order = new Order();
    order.StartDate = new Date();
    order.EndDate = new Date();
    order.ActualDate = new Date();
    order.Id = 1000;
    order.Number = '102030';
    this.httpService.saveOrder(order).subscribe(res => {
      this.isOK = res;
      this.isNOK = !res;
    });
  }

}
