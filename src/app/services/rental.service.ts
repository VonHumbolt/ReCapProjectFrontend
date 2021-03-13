import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from '../models/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrlForRentals = "https://localhost:44304/api/rentals/getRentalDetailDto"

  constructor(private httpClient : HttpClient) { }

  getRentals() : Observable<RentalResponseModel>{
    return this.httpClient.get<RentalResponseModel>(this.apiUrlForRentals)
  }
}
