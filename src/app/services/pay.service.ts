import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardInfo } from '../models/cardInfo';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  apiUrl = "https://localhost:44304/api"

  constructor(private httpClient: HttpClient) { }

  sendRentInfos(cardInfo: CardInfo) : Observable<CardInfo>{
    let url = this.apiUrl + "/rentals/rentCar"
    return this.httpClient.post<CardInfo>(url,cardInfo, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
}
