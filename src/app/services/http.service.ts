import { Injectable } from '@angular/core';
import { Car, CarType, Order, User } from '../model/objects';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


//////////////////////////////////////////////////////
// ONE SERVICE TO GET AND SET ALL DATA FROM SERVER
// THIS INCLUDE USES, CARS, CARTYPES, ORDERS
// THIS SERVICE USE GET AND POST
// THIS SERVICE INCLUDE GET LIST , DELETE ROW , UPDATE ROW 
// THIS SERVICE ALSO SUPPORT LOGIN
// ALL SERVICES ARE OBSERVEABLE
//////////////////////////////////////////////////////
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

  deleteOrder(id): Observable<boolean> {
    const urlUsers = baseUrl + 'DeleteOrder/' + id;
    return this.http.get<boolean>(urlUsers).pipe();
  }

  returnCar(order: Order): Observable<boolean> {
    const urlUsers = baseUrl + 'ReturnCar';
    return this.http.post<boolean>(urlUsers, order, { headers: { 'Content-Type': 'application/json' } }).pipe();
  }

  saveUser(user: User): Observable<number> {
    const urlUsers = baseUrl + 'SaveUser';
    return this.http.post<number>(urlUsers, user, { headers: { 'Content-Type': 'application/json' } }).pipe();
  }

  DeleteUser(id): Observable<boolean> {
    const urlUsers = baseUrl + 'DeleteUser/' + id;
    return this.http.get<boolean>(urlUsers).pipe();
  }

  Login(user: User): Observable<number> {
    const urlUsers = baseUrl + 'Login';
    return this.http.post<number>(urlUsers, user, { headers: { 'Content-Type': 'application/json' } }).pipe();
  }
  
  saveCar(user: Car): Observable<boolean> {
    const urlUsers = baseUrl + 'SaveCar';
    return this.http.post<boolean>(urlUsers, user, { headers: { 'Content-Type': 'application/json' } }).pipe();
  }

  DeleteCar(number): Observable<boolean> {
    const urlUsers = baseUrl + 'DeleteCar/' + number;
    return this.http.get<boolean>(urlUsers).pipe();
  }
}
