import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/objects';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnChanges {

  @Input() selectedUser: User = new User();
  @Input() isRegister: boolean = false;
  @Output() valueChange = new EventEmitter();

  user: User = new User();
  form1;

  initForm() {
    this.form1 = new FormGroup({
      Id: new FormControl(''),
      UserName: new FormControl('userX', [Validators.required]),
      FullName: new FormControl('new user', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Gender: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      Role: new FormControl(''),
    });

  }
  constructor(private httpService: HttpService) {
    this.initForm();
  }

  ngOnChanges() {

    console.log(111, this.selectedUser);
    if (this.selectedUser.Id>0) {
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

  saveUser() {
    const isNew = this.selectedUser.IsNew;
    this.selectedUser = new User(this.form1.value);
    this.selectedUser.IsNew = isNew;
    if (this.form1.valid) {
      this.httpService.saveUser(this.selectedUser).subscribe(res => {
        if (res) {
          this.valueChange.emit();
        }
      });
    } else {

      //alert('not valid');
      this.touchForm();
    }
  }
  register() {

    this.selectedUser = new User(this.form1.value);
    this.selectedUser.IsNew = true;
    this.selectedUser.Role = 3;
    if (this.form1.valid) {
      this.httpService.saveUser(this.selectedUser).subscribe(res => {
        if (res) {
          alert('register');
        } else {
          alert('error');
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


}
