import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileForm : FormGroup

  constructor(private formBuilder: FormBuilder, private userService: UserProfileService,
    private activatedRoute: ActivatedRoute, private toastrService: ToastrService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      if(param["userId"]){
        this.createProfileForm(parseInt(param["userId"]))
      }
    })
  }

  createProfileForm(userId: number){
    this.profileForm = this.formBuilder.group({
      id: [userId, Validators.required],
      firstName: ["",Validators.required],
      lastName: ["",Validators.required],
      email: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  updateUser(){
    if(this.profileForm.valid) {
      let userProfileModel = Object.assign({},this.profileForm.value)
      this.userService.updateUser(userProfileModel).subscribe(response => {
        this.toastrService.success(response.message)

        this.localStorageService.removeItem("email")
        this.localStorageService.setItem("email", this.profileForm.controls["email"].value)
      }, responseError => {
        console.log(responseError)
      })
    }
  }



}
