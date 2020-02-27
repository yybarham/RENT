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
  @Output() valueChange = new EventEmitter();

  user: User = new User();
  form1;

  initForm() {
    this.form1 = new FormGroup({
      Id: new FormControl('', [Validators.required]),
      UserName: new FormControl('', [Validators.required]),
      FullName: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Gender: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      Role: new FormControl('', [Validators.required]),
    });

  }
  constructor(private httpService: HttpService) {
    this.initForm();
  }
  ngOnChanges() {

    console.log(this.selectedUser.Id);
    if (this.selectedUser.Id) {
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
      alert('not valid');
    }
  }
  register() {
    this.selectedUser = new User(this.form1.value);    
    this.selectedUser.IsNew = true;
    this.httpService.saveUser(this.selectedUser).subscribe(res => {
      if (res) {
        alert('register');
      } else {
        alert('error');
      }
    });
  }

}
