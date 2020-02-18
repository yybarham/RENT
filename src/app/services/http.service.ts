import { Injectable } from '@angular/core';
import { Car, CarType, Order } from '../model/objects';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
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

}
