import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PayService } from 'src/app/services/pay.service';
import  { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { UserCardDetail } from 'src/app/models/userCardDetail';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  userCardDetailForm : FormGroup
  userId: number
  isSaved: boolean = false

  constructor(private payService: PayService, private toastrService: ToastrService ,
    private formBuilder : FormBuilder, private localStorageService: LocalStorageService, 
    private matDialog : MatDialog) { }

  ngOnInit(): void {

    this.getCardNumberFromDatabase()
    this.createUserCardDetailForm()
    
  }

  openDialog() {
    let dialogConfig = new MatDialogConfig()
    return this.matDialog.open(DialogBodyComponent,dialogConfig)
  }

  createUserCardDetailForm() {
    this.userCardDetailForm = this.formBuilder.group({
      id: [this.userId, Validators.required],
      cardNumber: ["", Validators.required]
    })
  }

  pay() {
    if(this.userCardDetailForm.valid){
      let carDetailModel = Object.assign({}, this.userCardDetailForm.value)
     
      this.payService.pay(carDetailModel).subscribe(response => {
        
        if(!this.isSaved){
          this.openDialog().afterClosed().subscribe(response => {
            if(response) {
              this.addCardNumber(carDetailModel)
            }
          })
        }
        this.toastrService.success(response.message)
        
      }, responseError => {
        if(responseError.error.ValidationError.length > 0) {
          for (let i = 0; i < responseError.error.ValidationError.length; i++) {
            this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage)
          }
        }
        
      })
    }
  }

  getCardNumberFromDatabase() {
    this.userId = parseInt(this.localStorageService.getItem("userId")!!)
    this.payService.getCardNumber(this.userId).subscribe(response => {
      if(response.data.cardNumber != null) {
        this.userCardDetailForm.controls["cardNumber"].setValue(response.data.cardNumber)
        this.isSaved = true
      }
    })
  }

  addCardNumber(carDetailModel : UserCardDetail){  
      this.payService.addCardNumber(carDetailModel).subscribe(response => {
        this.toastrService.success(response.message)
      })
  }
}
