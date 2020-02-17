import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { User } from 'src/app/model/objects';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})



export class UsersComponent {

  users: User[] = [];
  constructor(private http: HttpClient) {
    this.getUsers().subscribe(res => {
        this.users = res;
    });
  }

  getUsers(): Observable<User[]> {

    const urlUsers = baseUrl + 'GetUsers';
    return this.http.get<User[]>(urlUsers).pipe();

  }



}
