import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PayService } from 'src/app/services/pay.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  dataFromDetailPage : any
  cardNumber : string
  userCardDetailForm : FormGroup
  cardId: number
  userId: number

  constructor(private payService: PayService, private toastrService: ToastrService ,
    private activatedRoute: ActivatedRoute, private formBuilder : FormBuilder,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.dataFromDetailPage = this.activatedRoute.snapshot.queryParams
    
    this.getCardNumberFromDatabase() // ___
    this.createUserCardDetailForm()
  }

  createUserCardDetailForm() {
    this.userCardDetailForm = this.formBuilder.group({
      userId: [this.userId, Validators.required],
      cardNumber: ["", Validators.required]
    })
  }

  pay() {
      this.payService.pay().subscribe(response => {
        console.log(response)
        this.addCardNumber()
        this.toastrService.success(response.message)
      }, responseError => {
        this.toastrService.error(responseError.error)
      })
  }

  getCardNumberFromDatabase() {
    this.userId = parseInt(this.localStorageService.getItem("userId")!!)
    this.payService.getCardNumber(this.userId).subscribe(response => {
      this.cardId = response.data.id
      console.log(response.data)
    
    })
  }

  addCardNumber(){
    console.log(this.userCardDetailForm.valid)
    console.log(this.userCardDetailForm.value)
    
    let userCardDetailModel = Object.assign({},this.userCardDetailForm.value)
    this.payService.addCardNumber(userCardDetailModel).subscribe(response => {
      console.log(response)
    })
    
  }
}
