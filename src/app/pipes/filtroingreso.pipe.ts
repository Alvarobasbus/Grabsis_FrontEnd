import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../models/turno';

@Pipe({
  name: 'filtroingreso'
})
export class FiltroingresoPipe implements PipeTransform {

  transform(value: Turno[]): Turno[] {

    const turnos= [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if(element.ingreso==false && element.isDeleted==false){
        turnos.push(value[index])
      }
      
    }
    
    return turnos;
  }

}
