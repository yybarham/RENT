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
  chosen = '';
  days = 0;
  price = 0;
  minDate1 = new Date();
  minDate2 = new Date();
  order = new Order();
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.chosen = localStorage.getItem('chosen');
  }

  calculate() {
    this.price = 100;
  }

  placeOrder() {

    if (this.price > 0) {
      if (confirm('Are you sure ?')) {
        this.order.ActualDate = null;
        this.order.Id = 1000;
        this.order.Number = this.chosen;
        this.httpService.saveOrder(this.order).subscribe(res => {
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
      this.order.StartDate = selected;
      this.minDate2 = selected;
    } else {
      this.order.EndDate = selected;
    }

    if (this.order.StartDate && this.order.EndDate) {
      const diff = (this.order.EndDate.getTime() - this.order.StartDate.getTime()) / (1000 * 60 * 60 * 24);
      this.days = diff + 1;
      if (this.days > 0) {
        this.calculate();
      }
    }
  }


}
