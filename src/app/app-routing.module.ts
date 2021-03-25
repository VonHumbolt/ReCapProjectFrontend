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
import { PayComponent } from './components/pay/pay.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brands/:brandId", component:CarComponent},
  {path:"cars/colors/:colorId", component:CarComponent},
  {path:"cars/detail/:carId", component:CarDetailComponent},
  {path:"cars/detail/:carId/pay", component:PayComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"cars/:carId/update", component:CarUpdateComponent},
  {path:"brands", component:BrandListComponent},
  {path:"brands/update/:brandId", component:BrandUpdateComponent},
  {path:"colors",component:ColorListComponent},
  {path:"colors/update/:colorId", component:ColorUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
