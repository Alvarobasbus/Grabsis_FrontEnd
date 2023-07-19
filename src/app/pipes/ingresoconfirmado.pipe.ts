import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../models/turno';

@Pipe({
  name: 'ingresoconfirmado'
})
export class IngresoconfirmadoPipe implements PipeTransform {

  transform(value: Turno[] ): Turno[] {

    const turnos= [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if(element.ingreso==true && element.isDeleted==false && element.pagado==false){
        turnos.push(value[index])
      }
      
    }
    
    return turnos;
  }

}
