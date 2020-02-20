import { Injectable } from '@angular/core';
import { Car, CarType, Order, User } from '../model/objects';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    const urlUsers = baseUrl + 'GetUsers';
    return this.http.get<User[]>(urlUsers).pipe();
  }

  getCars(): Observable<Car[]> {
    const urlUsers = baseUrl + 'GetCars';
    return this.http.get<Car[]>(urlUsers).pipe();
  }

  getCarType(): Observable<CarType[]> {
    const urlUsers = baseUrl + 'GetCarTypes';
    return this.http.get<CarType[]>(urlUsers).pipe();
  }
  getOrders(): Observable<Order[]> {
    const urlUsers = baseUrl + 'GetOrders';
    return this.http.get<Order[]>(urlUsers).pipe();
  }

  saveOrder(order: Order): Observable<boolean> {
    const urlUsers = baseUrl + 'SaveOrder';
    return this.http.post<boolean>(urlUsers, order, { headers: { 'Content-Type': 'application/json' } }).pipe();
  }

  returnCar(order: Order): Observable<boolean> {
    const urlUsers = baseUrl + 'ReturnCar';
    return this.http.post<boolean>(urlUsers, order, { headers: { 'Content-Type': 'application/json' } }).pipe();
  }

  saveUser(user: User): Observable<boolean> {
    const urlUsers = baseUrl + 'SaveUser';
    return this.http.post<boolean>(urlUsers, user, { headers: { 'Content-Type': 'application/json' } }).pipe();
  }

  DeleteUser(id): Observable<boolean> {
    const urlUsers = baseUrl + 'DeleteUser/' + id;
    return this.http.get<boolean>(urlUsers).pipe();
  }
}
