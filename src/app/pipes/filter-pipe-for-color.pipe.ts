import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'filterPipeForColor'
})
export class FilterPipeForColorPipe implements PipeTransform {

  transform(value: Color[], queryText: String): Color[] {
    let searchedText = queryText ? queryText.toLowerCase() : ""
    return searchedText ? value.filter((c:Color) => c.colorName.toLowerCase().indexOf(searchedText) !== -1) : value;
  }

}
