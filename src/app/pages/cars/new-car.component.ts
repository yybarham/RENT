import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Car } from 'src/app/model/objects';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit, OnChanges {
  @Output() eventToParent = new EventEmitter();
  @Input() selectedCar: Car = new Car();
  form1 = new FormGroup({
    Number: new FormControl('', [Validators.required]),
    CarType: new FormControl(-1, [Validators.required, this.validateCarType]),
    Isvalid: new FormControl('', [Validators.required, this.validateBool]),
    IsFree: new FormControl('', [Validators.required, this.validateBool]),
    Mileage: new FormControl('', [Validators.required]),
    Branch: new FormControl(-1, [Validators.required, this.validateBranch]),
    Image: new FormControl(''),
  });
  base64textString = '';
  optBranch = [
    { key: -1, value: 'choose' },
    { key: 1, value: 'Tel Aviv' },
    { key: 2, value: 'Jerusalem' },
    { key: 3, value: 'Haifa' },
    { key: 4, value: 'Holon' },
  ];

  optType: any[] = [];
  isOK;
  isNOK;
  constructor(private httpService: HttpService) {
    this.httpService.getCarType().subscribe(res => {
      this.optType = res.map(r => ({ key: r.Id, value: r.Model }));
      this.optType.unshift({ key: -1, value: 'choose' });
    });
  }

  ngOnInit() {

  }

  initForm() {
    this.form1 = new FormGroup({
      Number: new FormControl('', [Validators.required]),
      CarType: new FormControl(-1, [Validators.required, this.validateCarType]),
      Isvalid: new FormControl('', [Validators.required, this.validateBool]),
      IsFree: new FormControl('', [Validators.required, this.validateBool]),
      Mileage: new FormControl('', [Validators.required]),
      Branch: new FormControl(-1, [Validators.required, this.validateBranch]),
      Image: new FormControl(''),
    });
  }

  ngOnChanges() {
    if (this.selectedCar.Number) {
      Object.keys(this.selectedCar).forEach(key => {
        if (this.form1.controls[key]) {
          this.form1.controls[key].setValue(this.selectedCar[key]);
        }
      });
      this.form1.controls['Isvalid'].setValue(this.selectedCar.Isvalid ? 1 : 0);
      this.form1.controls['IsFree'].setValue(this.selectedCar.IsFree ? 1 : 0);
    } else {
      this.initForm();
    }
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
    this.form1.get('Image').setValue(this.base64textString);

  }

  saveCar() {


    const isNew = this.selectedCar.IsNew;
    this.selectedCar = new Car(this.form1.value);
    this.selectedCar.IsNew = isNew;
    if (this.form1.invalid) {
      this.touchForm();
      alert('not valid');
      return;
    }
    if (confirm("Are you sure?")) {
      this.httpService.saveCar(this.selectedCar).subscribe(res => {
        this.isOK = res;
        this.isNOK = !res;
        setTimeout(() => {
          this.eventToParent.emit();
        }, 2000);
      });
    }
  }
  inValid(name) {
    return this.form1.get(name).invalid && this.form1.get(name).touched;
  }
  cancel() {
    this.eventToParent.emit();
  }

  touchForm() {
    Object.keys(this.form1.controls).forEach(key => {
      this.form1.get(key).markAsTouched();
    });
  }

  onChange(value) {
    this.form1.get('Branch').setValue(value);
  }
  get branch() {
    return this.form1.get('Branch').value;
  }

  onChangeType(value) {
    this.form1.get('CarType').setValue(value);
  }
  get cartype() {
    return this.form1.get('CarType').value;
  }

  validateBranch(control: AbstractControl) {
    const val = control.value;
    if (val === null || val === undefined || val === '') {
      return {
        validateValue: {
          valid: false
        }
      };
    } else {
      if (+val >= 1 && +val <= 4) {
        return null;
      } else {
        return {
          validateValue: {
            valid: false
          }
        };
      }
    }
  }
  validateCarType(control: AbstractControl) {
    const val = control.value;
    if (val === null || val === undefined || val === '') {
      return {
        validateValue: {
          valid: false
        }
      };
    } else {
      if (+val >= 1 && +val <= 5) {
        return null;
      } else {
        return {
          validateValue: {
            valid: false
          }
        };
      }
    }
  }
  validateBool(control: AbstractControl) {
    const val = control.value;
    if (val === null || val === undefined || val === '') {
      return {
        validateValue: {
          valid: false
        }
      };
    } else {
      if (+val >= 0 && +val <= 1) {
        return null;
      } else {
        return {
          validateValue: {
            valid: false
          }
        };
      }
    }
  }

}
