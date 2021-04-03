import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileForm : FormGroup

  constructor(private formBuilder: FormBuilder, private userService: UserProfileService,
    private activatedRoute: ActivatedRoute) { }

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
      email: ["",Validators.required]
    })
  }

  updateUser(){
    console.log(this.profileForm.valid)
    console.log(this.profileForm.value)
    if(this.profileForm.valid) {
      let userProfileModel = Object.assign({},this.profileForm.value)
      this.userService.updateUser(userProfileModel).subscribe(response => {
        console.log(response)
      })
    }
  }



}
