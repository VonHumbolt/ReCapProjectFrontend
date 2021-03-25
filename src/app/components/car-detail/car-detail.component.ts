import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetail : CarDetail[];
  rentals: Rental[];
  path: string = "https://localhost:44304/";
  rooterLink: string;
  rentDate : Date
  returnDate : Date


  constructor(private carDetailService : CarDetailService, private activatedRoute : ActivatedRoute, 
    private rentalService: RentalService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      if(param["carId"]){
        this.getCarImages(param["carId"])
      }
    })   
  }

  getCarImages(carId: number){
    this.carDetailService.getImage(carId).subscribe(response => {
      this.carDetail = response.data
    })
  }

  getRentalByCarId(carId : number){
    let rent_date = new Date(this.rentDate)
    let return_date = new Date(this.returnDate)

    this.rentalService.getRentalByCarId(carId).subscribe(response=> {
      this.rentals = response.data
      
      let returnDateFromDatabase = new Date(this.rentals[0].returnDate)
      if(rent_date.getTime() > returnDateFromDatabase.getTime()){
        //this.rooterLink="/cars/detail/" + carId + "/pay" 
        this.router.navigate(["/cars/detail/"+carId+"/pay"], {queryParams: {
            dateRent: rent_date,
            dateReturn: return_date,
            carId: carId
          }
        })
      }else{
        
        this.router.navigate(["/cars/detail/"+carId])
        //this.rooterLink = "/cars/detail/" + carId
        this.toastrService.error("Bu araba kiralanmış durumda.", "Üzgünüz!")
        console.log(this.rooterLink)

      }
    })
  }
  

}
