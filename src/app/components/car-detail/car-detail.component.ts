import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetail : Car[];
  rentals: Rental[];
  path: string = "https://localhost:44304/";
  rooterLink: string;
  rentDate : Date
  returnDate : Date
  customerFindeks: number

  constructor(private carService: CarService ,private activatedRoute : ActivatedRoute, 
    private rentalService: RentalService, private toastrService: ToastrService, private router: Router,
    private customerService: CustomerService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      if(param["carId"]){
        this.getCarImagesByCarId(param["carId"])
      }
    })   
  }

  getCarImagesByCarId(carId : number) {
    this.carService.getCarImagesByCarId(carId).subscribe(response => {
      this.carDetail = response.data
    })
  }

  getRentalByCarId(carId : number){
    let rent_date = new Date(this.rentDate)
    let return_date = new Date(this.returnDate)
    
    this.getCustomerFindeks()
    this.rentalService.getRentalByCarId(carId).subscribe(response=> {
      this.rentals = response.data

      let rentDateFromDatabase = new Date(this.rentals[0].rentDate)
      let returnDateFromDatabase = new Date(this.rentals[0].returnDate)
      
      if(this.carDetail[0].findeks >= this.customerFindeks){
        this.toastrService.error("Findeks puanınız bu aracı kiralamak için yeterli değil")    
        if(rent_date.getTime() > rentDateFromDatabase.getTime() && rent_date.getTime()<returnDateFromDatabase.getTime()){
            this.toastrService.error("Seçilen tarihler arasında araba kiralanmış durumda.", "Üzgünüz!")
        }
      }else{
          this.router.navigate(["/cars/detail/"+carId+"/pay"])
      }
    })
  }

  getCustomerFindeks() {
    let userId = parseInt(this.localStorageService.getItem("userId")!!)
    this.customerService.getCustomerByUserId(userId).subscribe(response => {
      this.customerFindeks = response.data.findeks
    })
  }
  

}
