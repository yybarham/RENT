import { Component, OnChanges } from '@angular/core';
import { LoginGuardService, AdminGuardService, EmployeeGuardService } from './services/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName = '';
  // tslint:disable-next-line:max-line-length
  constructor(private loginGuardService: LoginGuardService, private adminGuardService: AdminGuardService, private employeeGuardService: EmployeeGuardService, private router: Router) {
  }

  logout() {
    this.loginGuardService.isLoggedIn = false;
    this.adminGuardService.isAdmin = false;
    this.employeeGuardService.isEmployee = false;
    this.loginGuardService.loggedUser = '';
    this.router.navigate(['/']);
  }

}
