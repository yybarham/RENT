import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/objects';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnChanges {

  @Input() selectedUser: User = new User();
  @Input() isRegister: boolean = false;
  @Output() valueChange = new EventEmitter();

  result;
  user: User = new User();
  form1;
  optGender = [
    { key: -1, value: 'choose' },
    { key: 1, value: 'Male' },
    { key: 2, value: 'Female' },
  ];
  optRole = [
    { key: -1, value: 'choose' },
    { key: 1, value: 'Admin' },
    { key: 2, value: 'Employee' },
    { key: 3, value: 'User' },
  ];

  ddlList = [{ key: 1, value: 'Male' }, { key: 2, value: 'Female' }];
  unamePattern = "^[A-Za-z0-9]{5,15}$";
  initForm() {
    this.form1 = new FormGroup({
      Id: new FormControl(''),
      UserName: new FormControl('userN', [Validators.required, Validators.pattern(this.unamePattern)]),
      FullName: new FormControl('new user', [Validators.required, Validators.minLength(5)]),
      Email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      Gender: new FormControl(-1, [Validators.required, this.validateValue]),
      Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      Role: new FormControl(''),
    });

  }
  constructor(private httpService: HttpService) {
    this.initForm();
  }

  ngOnChanges() {
    if (this.selectedUser.Id > 0) {
      Object.keys(this.selectedUser).forEach(key => {
        if (this.form1.controls[key]) {
          this.form1.controls[key].setValue(this.selectedUser[key]);
        }
      });
    } else {
      this.initForm();
    }
  }

  ngOnInit() {

  }
  cancel() {
    this.valueChange.emit();
  }
  saveUser() {
    this.result = null;
    const isNew = this.selectedUser.IsNew;
    this.selectedUser = new User(this.form1.value);
    this.selectedUser.IsNew = isNew;
    if (this.form1.valid) {

      this.httpService.saveUser(this.selectedUser).subscribe(res => {
        this.result = res;
        if (res) {
          this.valueChange.emit();
        }
      });
    } else {

      this.touchForm();
    }
  }
  register() {

    this.selectedUser = new User(this.form1.value);
    this.selectedUser.IsNew = true;
    this.selectedUser.Role = 3;
    if (this.form1.valid) {
      this.httpService.saveUser(this.selectedUser).subscribe(res => {
        this.result = res;
        if (res == 1) {
          setTimeout(() => {
            this.valueChange.emit();
          }, 1500);
        }
      });
    } else {
      this.touchForm();
    }
  }

  touchForm() {
    Object.keys(this.form1.controls).forEach(key => {
      this.form1.get(key).markAsTouched();
    });
  }
  inValid(name) {
    return this.form1.get(name).invalid && this.form1.get(name).touched;
  }

  validateValue(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === undefined || val === '') {
      return {
        validateValue: {
          valid: false
        }
      };
    } else {
      if (+val === 1 || +val === 2) {
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
  onChange(value) {
    this.form1.get('Gender').setValue(value);
  }
  onChangeRole(value) {
    this.form1.get('Role').setValue(value);
  }
  get gender(){
    return this.form1.get('Gender').value;
  }
  get role(){
    return this.form1.get('Role').value;
  }
}
