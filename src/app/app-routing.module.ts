import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PayComponent } from './components/pay/pay.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path: "rentals", component:RentalComponent},
  {path:"cars/brands/:brandId", component:CarComponent},
  {path:"cars/colors/:colorId", component:CarComponent},
  {path:"cars/detail/:carId", component:CarDetailComponent},
  {path:"cars/detail/:carId/pay", component:PayComponent, canActivate:[LoginGuard]},
  {path:"cars/add", component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"brands/add", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"cars/:carId/update", component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"brands", component:BrandListComponent},
  {path:"brands/update/:brandId", component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"colors",component:ColorListComponent},
  {path:"colors/update/:colorId", component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"profile/:userId", component:UserProfileComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
