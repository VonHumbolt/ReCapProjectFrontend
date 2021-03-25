import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm : FormGroup
  
  constructor(private formBuilder: FormBuilder, private colorService: ColorService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorForm()
  }

  createColorForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
  }

  add(){
    // FormControlName koymak çok önemli html kısmına !
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response => {
        this.toastrService.success("Renk başarıyla eklendi")
      }, responseError => {
        if(responseError.error.ValidationError.length > 0) {
          for (let i = 0; i < responseError.error.ValidationError.length; i++) {
            this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage);
            
          }
        }
      })
    }else{
      this.toastrService.error("Lütfen bilgileri eksiksiz doldurunuz!")
    }
  }

}
