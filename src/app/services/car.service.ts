import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { AddedCar } from '../models/addedCar';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44304/api/cars/"

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>> {
    let url = this.apiUrl + "getCarDetailDtos";
    return this.httpClient.get<ListResponseModel<Car>>(url);
  }

  getCarsByBrandId(brandId: number): Observable<ListResponseModel<Car>>{
    let url = this.apiUrl + "getCarDetailByBrandId?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(url)
  }

  getCarsByColorId(colorId:number) : Observable<ListResponseModel<Car>>{
    let url  =this.apiUrl + "getCarDetailByColorId?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(url)
  }

  getCarImagesByCarId(carId : number): Observable<ListResponseModel<Car>>{
    let url = this.apiUrl + "getCarImagesByCarId?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(url);
  }

  filterCarsByColorAndBrandId(colorId: number, brandId: number) : Observable<ListResponseModel<Car>>{
    let url = this.apiUrl + "filterCarDetail?colorId=" + colorId +"&"+"brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(url);
  }

  add(car: AddedCar) : Observable<ResponseModel> {
    let url = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(url, car)
  }

  update(car:AddedCar): Observable<ResponseModel> {
    let url = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(url, car)
  }
}
