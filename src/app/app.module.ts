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
import { NewOrderComponent } from './pages/orders/new-order.component';
import { MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { ReturnCarComponent } from './pages/return-car/return-car.component';
import { NewUserComponent } from './pages/users/new-user.component';
import { ResigterComponent } from './pages/users/resigter.component';
import { LoginComponent } from './pages/users/login.component';
import { LoginGuardService } from './services/auth-guard.service';
import { NewCarComponent } from './pages/cars/new-car.component';
import { Role, CarType, BrType, GType, FilterCol, ComboTxt, FilterAll, GenType } from './utils/pipes';
import { InfoComponent } from './info/info.component';
import { SearchCarComponent } from './pages/cars/search-car.component';
import { EditCarComponent } from './pages/cars/edit-car.component';
import { EditOrderComponent } from './pages/orders/edit-order.component';

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
    NewCarComponent,
    GenType, Role, CarType, BrType, GType, FilterCol, ComboTxt, FilterAll, InfoComponent, SearchCarComponent, EditCarComponent, EditOrderComponent
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
  providers: [HttpService, LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

