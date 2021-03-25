import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrlForColor = "https://localhost:44304/api/colors/";

  constructor(private httpClient : HttpClient) { }

  getColors() : Observable<ListResponseModel<Color>>{
    let url = this.apiUrlForColor + "getall";
    return this.httpClient.get<ListResponseModel<Color>>(url);
  }

  add(color : Color) : Observable<ResponseModel>{
    let url = this.apiUrlForColor + "add"
    return this.httpClient.post<ResponseModel>(url, color)
  }

  update(color: Color) : Observable<ResponseModel>{
    let url = this.apiUrlForColor + "update"
    return this.httpClient.post<ResponseModel>(url, color)
  }
}
