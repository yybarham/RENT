import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Car } from 'src/app/model/objects';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {
  form1;
  base64textString = '';
  selectedCar: Car;


  constructor(private httpService: HttpService) {
    this.initForm();
  }

  initForm() {
    this.form1 = new FormGroup({
      Number: new FormControl('', [Validators.required]),
      CarType: new FormControl('', [Validators.required]),
      Isvalid: new FormControl('', [Validators.required]),
      IsFree: new FormControl('', [Validators.required]),
      Mileage: new FormControl('', [Validators.required]),
      Branch: new FormControl('', [Validators.required]),
      Image: new FormControl(''),
    });
  }
  ngOnInit() {
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(100, this.base64textString);
    this.form1.get('Image').setValue(this.base64textString);

  }

  saveCar() {
    this.selectedCar = new Car(this.form1.value);
    this.selectedCar.IsNew = true;
    if (this.form1.invalid) {
      Object.keys(this.form1.controls).forEach(key => {
        this.form1.get(key).markAsTouched();
      });
      alert('not valid');
      return;
    }
    if (confirm("confirm")) {
      this.httpService.saveCar(this.selectedCar).subscribe(res => {
        alert(res);
      });
    }
  }
  inValid(name) {
    return this.form1.get(name).invalid && this.form1.get(name).touched;
  }


}