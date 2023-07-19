import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precio'
})
export class PrecioPipe implements PipeTransform {

  precio: number;

  transform(value: any, ...args: unknown[]): unknown {

    this.precio = value.toFixed(2)
   
    return  `$${this.precio}`;
  }

}
