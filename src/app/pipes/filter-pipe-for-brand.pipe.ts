import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filterPipeForBrand'
})
export class FilterPipeForBrandPipe implements PipeTransform {

  transform(value: Brand[], queryText: string): Brand[] {
    let searcedText = queryText ? queryText.toLowerCase() : ""
    return searcedText ? value.filter((b:Brand) => b.brandName.toLowerCase().indexOf(searcedText) !== -1) : value;
  }

}
