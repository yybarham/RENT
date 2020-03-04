import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from 'src/app/model/objects';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit  {

  form1;
  selectedOrder: Order;
  data:string = '';

  constructor(private httpService: HttpService) {
    this.initForm();
  }

  initForm() {
    this.form1 = new FormGroup({
      OrderId: new FormControl('', [Validators.required]),
      StartDate: new FormControl('', [Validators.required]),
      EndDate: new FormControl('', [Validators.required]),
      ActualDate: new FormControl('', [Validators.required]),
      UserName: new FormControl('', [Validators.required]),
      Payed: new FormControl('', [Validators.required]),
      Number: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
  }
  inValid(name) {
    return this.form1.get(name).invalid && this.form1.get(name).touched;
  }
  startEdit(selected: Order) {
    this.selectedOrder = selected;
    Object.keys(this.selectedOrder).forEach(key => {
      if (this.form1.controls[key]) {
        this.form1.controls[key].setValue(this.selectedOrder[key]);
      }
    });
  }
  saveOrder(){
    this.selectedOrder = new Order(this.form1.value);
    this.selectedOrder.IsNew = false;
    this.httpService.saveOrder(this.selectedOrder).subscribe(res => {
      alert(res)
      if(res){
        this.selectedOrder = null;
        this.data = 'saved';
      }
      // this.isOK = res;
      // this.isNOK = !res;
    });
  }
  cancel(){
    
  }
}
