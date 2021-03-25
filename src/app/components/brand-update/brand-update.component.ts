import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm: FormGroup
  brandId : number
  constructor(private formBuilder: FormBuilder, private brandService: BrandService, private toastrService: ToastrService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]){
        this.brandId = parseInt(params["brandId"])
      }
    })
    this.createUpdatedForm()
  }

  createUpdatedForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [this.brandId, Validators.required],
      brandName: ["",Validators.required]
    })
  }

  update(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({}, this.brandUpdateForm.value)
      this.brandService.update(brandModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
      }, responseError => {
        if(responseError.error.ValidationError.length > 0) {
          for (let i = 0; i < responseError.error.ValidationError.length; i++) {
            this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage);
            
          }
        }
      })
    }else {
      this.toastrService.error("Lütfen bilgileri eksiksiz giriniz.")
    }
  }

}
