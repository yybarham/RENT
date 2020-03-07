import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/objects';

//////////////////////////////////////////////////////
// THIS SERVICE HANDLE AUTHORIZATION
// ITS INCLUDE 3 LEVELS OF AUTHORIZATION
//-> ADMIN - CAN DO ANYTHING IN THIS SITE
//-> EMPLOYEE - CAN RETURN CARS
//-> USER - CAR ORDER A CAR AND VIEW ORDERS
//////////////////////////////////////////////////////
@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  isLoggedIn = false;
  loggedUser: string;
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLoggedIn) {
      return new Promise<boolean>((resolve) => {
        resolve(true);
      });
    } else {
      this.router.navigate(['login', { url: state.url }]);
      return false;
    }
  }
  get logged(): string {
    return this.loggedUser;
}

}
@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  isAdmin = false;

  constructor(private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAdmin) {
      return new Promise<boolean>((resolve) => {
        resolve(true);
      });
    } else {
      this.router.navigate(['login', { url: state.url }]);
      return false;
    }
  }
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeGuardService implements CanActivate {
  isEmployee = false;
  constructor(private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isEmployee) {
      return new Promise<boolean>((resolve) => {
        resolve(true);
      });
    } else {
      this.router.navigate(['login', { url: state.url }]);
      return false;
    }
  }
}
