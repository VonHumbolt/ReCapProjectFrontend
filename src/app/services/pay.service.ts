import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserCardDetail } from '../models/userCardDetail';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  apiUrl = "https://localhost:44304/api"

  constructor(private httpClient: HttpClient) { }

  pay(userCardDetail : UserCardDetail) : Observable<ResponseModel>{
    let url = this.apiUrl + "/rentals/pay";
    return this.httpClient.post<ResponseModel>(url, userCardDetail)
  }

  getCardNumber(userId : number) : Observable<SingleResponseModel<UserCardDetail>> {
    let url = this.apiUrl + "/rentals/getUserCardNumber?userId="+userId
    return this.httpClient.get<SingleResponseModel<UserCardDetail>>(url);
  }

  addCardNumber(userCardDetail : UserCardDetail) : Observable<ResponseModel>{
    let url = this.apiUrl + "/rentals/updateCardNumber";
    return this.httpClient.post<ResponseModel>(url, userCardDetail)
  }
}
