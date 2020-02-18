import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './pages/users/users.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CarTypeComponent } from './pages/car-type/car-type.component';
import { CarsComponent } from './pages/cars/cars.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';

import { MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { ReturnCarComponent } from './pages/return-car/return-car.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CarTypeComponent,
    CarsComponent,
    OrdersComponent,
    NewOrderComponent,
    ReturnCarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

