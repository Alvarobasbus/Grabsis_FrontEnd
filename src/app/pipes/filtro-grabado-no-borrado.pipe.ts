import { Pipe, PipeTransform } from '@angular/core';
import { Grabado } from '../models/grabado';

@Pipe({
  name: 'filtroGrabadoNoBorrado'
})
export class FiltroGrabadoNoBorradoPipe implements PipeTransform {

  transform(value: Grabado[]): Grabado[] {

    const grabados= [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if(element.isDeleted==true){
        grabados.push(value[index])
      }
      
    }
    
    return grabados;
  }

}
