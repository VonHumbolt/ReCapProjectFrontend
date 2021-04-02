import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiForCustomerUrl = "https://localhost:44304/api/customers/";

  constructor(private httpClient : HttpClient) { }

  getCustomers() : Observable<ListResponseModel<Customer>>{
    let url = this.apiForCustomerUrl + "getall"
    return this.httpClient.get<ListResponseModel<Customer>>(url);
  }

  getCustomerByUserId(userId : number) : Observable<SingleResponseModel<Customer>>{
    let url = this.apiForCustomerUrl + "getByUserId?userId=" + userId
    return this.httpClient.get<SingleResponseModel<Customer>>(url);
  }
}
