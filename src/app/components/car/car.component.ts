import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = []
  brands: Brand[] = []
  colors: Color[] = []
  isLoaded = false
  searchText = ""
  selectedBrand: number;
  selectedColor: number;

  constructor(private carService : CarService, private activedRoute: ActivatedRoute, private brandService: BrandService,
    private colorService : ColorService) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"])
      }
      else {
        this.getCars()
      }
      this.getBrands()
      this.getColors()
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) =>{
      this.cars = response.data
      this.isLoaded = true
    })
  }

  getCarsByBrandId(brandId : number){
    this.carService.getCarsByBrandId(brandId).subscribe(response => {
      this.cars = response.data
      this.isLoaded = true
    })
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe(response  => {
      this.cars = response.data
      this.isLoaded = true
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  filterCarByColorAndBrandId(colorId: number, brandId: number) {
    this.carService.filterCarsByColorAndBrandId(colorId, brandId).subscribe(response => {
      this.cars = response.data
    })
  }
}
