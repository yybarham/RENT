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

  @Input() selectedUser: User;
  @Output() valueChange = new EventEmitter();

  user: User = new User();
  form1;
  constructor(private httpService: HttpService) {

  }
  ngOnChanges() {
    console.log(this.selectedUser.Id);
    this.form1 = new FormGroup({
      id: new FormControl(this.selectedUser.Id, [Validators.required, Validators.pattern('^[0-9]*$')]),
      userName: new FormControl(this.selectedUser.UserName, [Validators.required, Validators.pattern('^[A-Za-z]*$')]),
      fullName: new FormControl(this.selectedUser.FullName, [Validators.required]),
      email: new FormControl(this.selectedUser.Email, [Validators.required]),
      gender: new FormControl(this.selectedUser.Gender, [Validators.required]),
      password: new FormControl(this.selectedUser.Password, [Validators.required]),
      role: new FormControl(this.selectedUser.Role, [Validators.required]),
    });
  }

  ngOnInit() {

  }

  saveUser() {
    const isNew = this.selectedUser.IsNew;
    this.selectedUser = new User(this.form1.value);
    this.selectedUser.IsNew = isNew;
    this.httpService.saveUser(this.selectedUser).subscribe(res => {
      if (res) {
        this.valueChange.emit();
      }
    });

  }

}
