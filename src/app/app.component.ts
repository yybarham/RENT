import { Component, OnChanges } from '@angular/core';
import { UserGuardService, AdminGuardService, EmployeeGuardService } from './services/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName = '';
  // tslint:disable-next-line:max-line-length
  constructor(private userGuardService: UserGuardService, private adminGuardService: AdminGuardService, private employeeGuardService: EmployeeGuardService, private router: Router) {
  }

  logout() {
    this.userGuardService.isLoggedIn = false;
    this.adminGuardService.isAdmin = false;
    this.employeeGuardService.isEmployee = false;
    this.userGuardService.loggedUser = '';
    this.router.navigate(['/']);
  }

}
