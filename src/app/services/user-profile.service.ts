import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  apiUrl = "https://localhost:44304/api/users/"

  constructor(private httpClient: HttpClient) { }

  updateUser(user: User) : Observable<ResponseModel>{
    let url = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(url, user);
  }
}
