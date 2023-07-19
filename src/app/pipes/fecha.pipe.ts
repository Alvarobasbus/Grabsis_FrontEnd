import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  pipe = new DatePipe('en-US');
  fecha: Date = new Date();

  transform(value: Date, ...args: unknown[]): unknown {

    return this.pipe.transform(value, 'dd-MM-YYYY');
  }

}
