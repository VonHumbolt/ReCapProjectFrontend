import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup

  constructor(private formBuilder: FormBuilder, private brandService: BrandService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createBrandForm()
  }

  createBrandForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["",Validators.required]
    })
  }

  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({}, this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response=> {
        this.toastrService.success("Brand başarıyla eklendi")
      }, responseError => {
        if(responseError.error.ValidationError.length > 0) {
          for (let i = 0; i < responseError.error.ValidationError.length; i++) {
        
            this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage)
          }
        }
      })
    }else{
      this.toastrService.error("Lütfen bilgileri eksiksiz doldurunuz!")
    }
  }

}
