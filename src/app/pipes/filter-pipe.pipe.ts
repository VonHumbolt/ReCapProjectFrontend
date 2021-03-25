import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], queryText: string): Car[] {
    let searchedText = queryText ? queryText.toLowerCase(): ""
    return searchedText ? value.filter((c:Car) => c.carName.toLocaleLowerCase().indexOf(searchedText) !== -1) : value;
  }

}
