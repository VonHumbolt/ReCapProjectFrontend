import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrlForBrands = "https://localhost:44304/api/brands/";

  constructor(private httpClient : HttpClient) { }

  getBrands() : Observable<ListResponseModel<Brand>>{
    let url = this.apiUrlForBrands + "getall";
    return this.httpClient.get<ListResponseModel<Brand>>(url);
  }

  add(brand: Brand) : Observable<ResponseModel>{
    let url = this.apiUrlForBrands + "add"
    return this.httpClient.post<ResponseModel>(url, brand)
  }

  update(brand: Brand) : Observable<ResponseModel>{
    let url = this.apiUrlForBrands + "update";
    return this.httpClient.post<ResponseModel>(url,brand)
  }
}
