import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isAuthenticated : boolean
  username:string
  findeks: number
  userId : number

  constructor(private authService: AuthService, private localStorageService: LocalStorageService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated()
    if(this.isAuthenticated){
      this.getUserByEmail()
    }
  }

  getUserByEmail() {
    let email = this.localStorageService.getItem("email")
    this.authService.getUserByEmail(email!!).subscribe(response => {
      this.username = response.data.firstName + " " + response.data.lastName
      this.userId = response.data.id

      this.getUserFindeksScore(this.userId)
      this.localStorageService.setItem("userId",response.data.id.toString())
    })
  }

  getUserFindeksScore(userId : number) {
    this.customerService.getCustomerByUserId(userId).subscribe(response => {
      this.findeks = response.data.findeks
    })
  }

  logout() {
    this.localStorageService.clean()
  }
}
