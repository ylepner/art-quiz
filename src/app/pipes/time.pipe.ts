import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value?: number): string {
    if (value == null) {
      return 'NO VALUE!'
    }
    if (value < 10) {
      return `0:0${value}`
    }
    return `0:${value}`
  }
}
