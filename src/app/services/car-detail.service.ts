import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = "https://localhost:44304/api/";

  constructor(private httpClient: HttpClient) { }

  getImage(carId : number) : Observable<ListResponseModel<CarDetail>> {
    let url = this.apiUrl + "carImages/getImagesByCarId?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(url)
  }
 
}

