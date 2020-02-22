import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './pages/users/users.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarTypeComponent } from './pages/car-type/car-type.component';
import { CarsComponent } from './pages/cars/cars.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';

import { MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { ReturnCarComponent } from './pages/return-car/return-car.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { ResigterComponent } from './pages/users/resigter.component';
import { LoginComponent } from './pages/users/login.component';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CarTypeComponent,
    CarsComponent,
    OrdersComponent,
    NewOrderComponent,
    ReturnCarComponent,
    NewUserComponent,
    ResigterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [HttpService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

