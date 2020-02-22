import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/model/objects';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
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

  constructor(private httpService: HttpService,
              private authGuardService: AuthGuardService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  login() {
    const user = new User();
    user.UserName = this.form1.get('UserName').value;
    user.Password = this.form1.get('Password').value;
    this.httpService.Login(user).subscribe(res => {
      if (res > 0) {
        this.authGuardService.isLoggedIn = true;
        this.router.navigate([this.route.snapshot.params.url]);
      }
    });

  }

}
