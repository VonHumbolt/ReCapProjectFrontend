import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdatedForm : FormGroup
  colorId : number

  constructor(private formBuilder: FormBuilder, private colorService: ColorService, private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      if(param["colorId"]){
        this.colorId = parseInt(param["colorId"])
      }
    })

    this.createUpdatedForm()
  }

  createUpdatedForm() {
    this.colorUpdatedForm = this.formBuilder.group({
      colorId: [this.colorId, Validators.required],
      colorName: ["",Validators.required]
    })
  }

  update(){
    if(this.colorUpdatedForm.valid){
      let colorModel = Object.assign({}, this.colorUpdatedForm.value)
      this.colorService.update(colorModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
      }, responseError => {
        if(responseError.error.ValidationError.length > 0){
          for (let i = 0; i < responseError.error.ValidationError.length; i++) {
            this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage);
            
          }
        }
      })
    } else {
      this.toastrService.error("Lütfen bilgileri eksiksiz giriniz!")
    }
  }
}
