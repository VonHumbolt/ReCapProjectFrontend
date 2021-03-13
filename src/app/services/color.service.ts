import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrlForColor = "https://localhost:44304/api/colors/getall";

  constructor(private httpClient : HttpClient) { }

  getColors() : Observable<ColorResponseModel>{
    return this.httpClient.get<ColorResponseModel>(this.apiUrlForColor);
  }
}
