import { Pipe, PipeTransform } from '@angular/core';
import { Detalle } from '../models/detalle';

@Pipe({
  name: 'detallePorGrabar'
})
export class DetallePorGrabarPipe implements PipeTransform {

  transform(value: Detalle[]): Detalle[] {

    const detalles= [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if(element.servicio.descripcion!="FORMULARIO 12" && element.servicio.descripcion!="GRABADO DE CRISTALES" 
      && element.turno.vehiculo.autopartes==false ){
        detalles.push(value[index])
      }
      
    }
    
    return detalles;
  }

}
