import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(value: []) {
    if (!!value && value.length > 0) {
      return value.slice().reverse();
    }
    return value;
  }
}
