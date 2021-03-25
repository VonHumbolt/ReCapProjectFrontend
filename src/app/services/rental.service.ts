import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrlForRentals = "https://localhost:44304/api/rentals/"

  constructor(private httpClient : HttpClient) { }

  getRentals() : Observable<ListResponseModel<Rental>>{
    let url = this.apiUrlForRentals + "getRentalDetailDto";
    return this.httpClient.get<ListResponseModel<Rental>>(url)
  }

  getRentalByCarId(carId: number) : Observable<ListResponseModel<Rental>>{
    let url = this.apiUrlForRentals + "getRentalByCarId?carId=" + carId
    return this.httpClient.get<ListResponseModel<Rental>>(url)
  }
}
