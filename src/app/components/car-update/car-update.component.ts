import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdatedForm: FormGroup
  carId: number

  constructor(private formBuilder: FormBuilder, private carService: CarService, private toastrService: ToastrService
    ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      if(param["carId"]){
        this.carId = parseInt(param["carId"])
      }
    }) 
    this.createUpdatedForm()
  }

  createUpdatedForm() {
    this.carUpdatedForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      brandId: ["",Validators.required],
      colorId:["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["",Validators.required],
      carName: ["", Validators.required]
    })
  }

  update() {
    if(this.carUpdatedForm.valid){
      console.log(this.carUpdatedForm.value)
      let carUpdatedModel = Object.assign({}, this.carUpdatedForm.value)
      this.carService.update(carUpdatedModel).subscribe(response=>{
        this.toastrService.success("Başarıyla güncellendi")
      }, responseError => {
        if(responseError.error.ValidationError.length > 0){
          for (let i = 0; i < responseError.error.ValidationError.length; i++) {
            this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage);
            
          }
        }
      })
    }else{
      this.toastrService.error("Lütfen bilgileri eksiksiz giriniz!")
    }
  }

}
