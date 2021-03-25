import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

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
    let url = this.apiUrl + "getCarsByBrandId?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(url)
  }

  getCarsByColorId(colorId:number) : Observable<ListResponseModel<Car>>{
    let url  =this.apiUrl + "getCarsByColorId?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(url)
  }

  add(car: Car) : Observable<ResponseModel> {
    let url = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(url, car)
  }

  update(car:any): Observable<ResponseModel> {
    let url = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(url, car)
  }
}
