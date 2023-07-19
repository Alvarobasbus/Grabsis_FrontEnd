import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroParaOrdenar'
})
export class FiltroParaOrdenarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
