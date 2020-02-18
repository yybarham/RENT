import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CarTypeComponent } from './pages/car-type/car-type.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { ReturnCarComponent } from './pages/return-car/return-car.component';



const routes: Routes = [
  { path: 'users', component: UsersComponent},
  { path: 'cars', component: CarsComponent},
  { path: 'cartype', component: CarTypeComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'new-order', component:  NewOrderComponent},
  { path: 'return-car', component:  ReturnCarComponent},
  // { path: 'login', component: LoginComponent },
  // { path: 'admin', component: AdminComponent },
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
