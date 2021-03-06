import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { User } from 'src/app/model/objects';
import { HttpService } from 'src/app/services/http.service';

//////////////////////////////////////////////////////////////////////
// THIS COMPONENT DISPLAY LIST OF ALL USERS - FOR ADMINISTRARTOR ONLY
// HE CAN DELETE- MODIFY - ADD NEW ALL START HERE
// INNER COMPONENT <app-new-user> IS USED TO EDIT AND CREATE NEW USER 
// DELETE IS DONE FROM HERE
// AFTER ANY CHANGES THE LIST IS REFRESHED
//////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: User[] = [];
  selectedUser: User;
  edit = false;

  constructor(private httpService: HttpService) {
    this.getUsers();
  }

  getUsers() {
    this.httpService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  editUser(Id) {
    this.selectedUser = this.users.filter(u => u.Id === Id)[0];
    this.selectedUser.IsNew = false;
    this.edit = true;
  }

  newUser() {
    this.selectedUser = new User();
    this.selectedUser.Id = 0;
    this.selectedUser.IsNew = true;
    this.edit = true;
  }
  refresh() {
    this.getUsers();
    
    setTimeout(()=>{
      this.edit = false;
    },1500)
  }

  deleteUser(id) {
    if (confirm('Are you sure ?')) {

      this.httpService.DeleteUser(id).subscribe(res => {
        if (res) {
          this.getUsers();
        }
      });
    }
  }
}
