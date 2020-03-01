import { Data } from '@angular/router';

export class User {
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
}
  Id: number;
  FullName: string;
  UserName: string;
  Gender: number;
  Email: string;
  Password: string;
  Role: number;
  IsNew: boolean;
}
export class Car {
  public constructor(init?: Partial<Car>) {
    Object.assign(this, init);
}
  Number: string;
  CarType: number;
  Isvalid: boolean;
  IsFree: boolean;
  Mileage: number;
  Branch: number;
  Image: any;
  IsNew: boolean;
  selected = false; // local use
}
export class CarType {
  Id: number;
  Manufacturer: string;
  Model: string;
  DailyCost: number;
  DailyPenalty: number;
  Year: number;
  GearType: number;
  IsNew: boolean;
}

export class Order {
  OrderId: number;
  StartDate: Date;
  EndDate: Date;
  ActualDate: Date;
  UserName:string;
  Number: string;
  Payed: number;
}
