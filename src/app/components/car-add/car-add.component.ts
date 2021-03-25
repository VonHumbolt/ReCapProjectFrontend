import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup

  constructor(private formBuilder : FormBuilder, private carService: CarService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createCarModel()
  }

  createCarModel() {
    this.carAddForm = this.formBuilder.group({
      brandName: ["", Validators.required],
      colorName: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      carName: ["", Validators.required]
    })
  }

  add() {
    if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value)
      this.carService.add(carModel).subscribe(response => {
        this.toastrService.success(response.message)
      }, responseError => {
        if(responseError.error.ValidationError.length > 0){
          for (let i = 0; i < responseError.error.ValidationError.length; i++) {
            this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage)          
          }
        }
      })
    }else {
      this.toastrService.error("Lütfen bilgileri eksiksiz doldurunuz.")
    }
   
  }

}
