import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Car } from 'src/app/model/objects';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  base64textString = '';
  constructor(private httpService: HttpService) {
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

  }

  saveCar() {
    const car = new Car();
    car.IsNew = true;
    car.Number = '555555';
    car.Branch = 1;
    car.CarType = 1;
    car.Image = this.base64textString;
    car.IsFree = true;
    car.Isvalid = true;
    car.Mileage = 90;
    this.httpService.saveCar(car).subscribe(res => {
      alert(res);
    });
  }


}
