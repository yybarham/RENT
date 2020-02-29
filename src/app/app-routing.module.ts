import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CarTypeComponent } from './pages/car-type/car-type.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewOrderComponent } from './pages/orders/new-order.component';
import { ReturnCarComponent } from './pages/return-car/return-car.component';
import { ResigterComponent } from './pages/users/resigter.component';
import { LoginComponent } from './pages/users/login.component';
import { LoginGuardService, AdminGuardService, EmployeeGuardService } from './services/auth-guard.service';
import { NewCarComponent } from './pages/cars/new-car.component';
import { InfoComponent } from './info/info.component';
import { SearchCarComponent } from './pages/cars/search-car.component';
import { EditCarComponent } from './pages/cars/edit-car.component';



const routes: Routes = [
  // HOME
  { path: '', component: InfoComponent },
  // ADMIN
  { path: 'users', component: UsersComponent, canActivate: [AdminGuardService] },
  { path: 'cartype', component: CarTypeComponent, canActivate: [AdminGuardService] },
  { path: 'editcar', component: EditCarComponent, canActivate: [AdminGuardService] },
  { path: 'orders', component: OrdersComponent, canActivate: [LoginGuardService] },
  //EMPLOYEE
  { path: 'return-car', component: ReturnCarComponent, canActivate: [EmployeeGuardService] },
  // USER
  { path: 'search', component: SearchCarComponent, canActivate: [LoginGuardService] },
  { path: 'new-order', component: NewOrderComponent, canActivate: [LoginGuardService] },
  // GUEST
  { path: 'register', component: ResigterComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
