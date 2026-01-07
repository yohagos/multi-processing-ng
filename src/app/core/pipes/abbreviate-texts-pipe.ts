import { Pipe, PipeTransform } from '@angular/core';
import { AbbreviationEnum } from '../enums/abbreviation';


@Pipe({
  name: 'abbreviateTextsPipe'
})
export class AbbreviateTextsPipe implements PipeTransform {

  transform(value: string, key: string): string {
    return key === AbbreviationEnum.FULL.toString() ? value : value.substring(0, 100) + ' ...'
  }

}
