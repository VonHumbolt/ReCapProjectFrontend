import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CardInfo } from 'src/app/models/cardInfo';
import { PayService } from 'src/app/services/pay.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  cardNumber: number
  customerName: string
  customerLastName: string
  dataFromDetailPage : any

  constructor(private payService: PayService, private toastrService: ToastrService ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataFromDetailPage = this.activatedRoute.snapshot.queryParams
  }

  sendRentalInfos() {
    let cardInfo = new CardInfo()
    cardInfo.cardNumber = this.cardNumber.toString()
    cardInfo.rentDate = this.dataFromDetailPage.dataRent 
    cardInfo.returnDate = this.dataFromDetailPage.dataReturn
    cardInfo.price = 200
   
    if(this.cardNumber.toString().length === 12){
      this.toastrService.success("Ödeme başarıyla yapıldı!", "Teşekkürler!")
      this.payService.sendRentInfos(cardInfo).subscribe(response => {
        console.log(response)
      })
    }else{
      this.toastrService.error("Lütfen bilgilerinizi eksiksiz doldurunuz.")
    }
  }

}
