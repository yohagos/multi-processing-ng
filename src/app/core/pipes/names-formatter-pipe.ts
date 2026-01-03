import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namesFormatter'
})
export class NamesFormatterPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value || typeof value !== 'string') return ''

    return value
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase())
  }

}
