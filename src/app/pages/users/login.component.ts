import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/model/objects';
import { LoginGuardService, AdminGuardService, EmployeeGuardService } from 'src/app/services/auth-guard.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form1 = new FormGroup({
    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });

  // tslint:disable-next-line:max-line-length
  constructor(private httpService: HttpService, private adminGuardService: AdminGuardService, private loginGuardService: LoginGuardService, private employeeGuardService: EmployeeGuardService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  login() {
    const user = new User();
    user.UserName = this.form1.get('UserName').value;
    user.Password = this.form1.get('Password').value;
    this.httpService.Login(user).subscribe(res => {
      if (res > 0) {
        this.loginGuardService.loggedUser = user.UserName;
        this.loginGuardService.isLoggedIn = true;
        if (res === 1) {
          this.adminGuardService.isAdmin = true;
          this.employeeGuardService.isEmployee = true;
        }
        if (res === 2) {
          this.employeeGuardService.isEmployee = true;
        }
        if (this.route.snapshot.params.url) {
          this.router.navigate([this.route.snapshot.params.url]);
        } else {
          this.router.navigate(['/']);
        }
      }
    });

  }

}
