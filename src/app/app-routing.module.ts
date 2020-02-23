import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CarTypeComponent } from './pages/car-type/car-type.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { ReturnCarComponent } from './pages/return-car/return-car.component';
import { ResigterComponent } from './pages/users/resigter.component';
import { LoginComponent } from './pages/users/login.component';
import { LoginGuardService, AdminGuardService, EmployeeGuardService } from './services/auth-guard.service';
import { NewCarComponent } from './pages/cars/new-car.component';



const routes: Routes = [
  
  { path: 'users', component: UsersComponent, canActivate: [AdminGuardService] },
  { path: 'cartype', component: CarTypeComponent, canActivate: [AdminGuardService] },
  { path: 'new-car', component: NewCarComponent },
  

  { path: 'return-car', component: ReturnCarComponent, canActivate: [EmployeeGuardService] },

  { path: 'cars', component: CarsComponent, canActivate: [LoginGuardService] },
  { path: 'orders', component: OrdersComponent, canActivate: [LoginGuardService] },
  { path: 'new-order', component: NewOrderComponent, canActivate: [LoginGuardService] },
  
  { path: 'register', component: ResigterComponent },
  { path: 'login', component: LoginComponent },

  // { path: 'home', component: HomeComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'rentCar', component:  CarRentFormComponent},
  // { path: 'searchHome', component:  SearchHomePageComponent},
  // { path: 'finalForm', component:  FinalRentFormComponent},
  // { path: 'editCar', component:  EditCarComponent},
  // { path: 'createOrder', component:  CreateOrderComponent},
  // { path: 'carTypes', component:  CarTypesComponent},
  // { path: 'createCarType', component:  CreateCarTypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
