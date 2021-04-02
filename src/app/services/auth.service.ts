import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44304/api/auth/"

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  login(loginModel : LoginModel){
    let url = this.apiUrl + "login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(url, loginModel)
  }

  register(registerModel : RegisterModel) {
    let url = this.apiUrl + "register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(url, registerModel)
  }

  getUserByEmail(email:string){
    let url = this.apiUrl + "getByEmail?email=" + email
    return this.httpClient.get<SingleResponseModel<User>>(url)
  }

  isAuthenticated() {
    if(this.localStorageService.getItem("token")){
      return true
    }else {
      return false
    }
  }
}
