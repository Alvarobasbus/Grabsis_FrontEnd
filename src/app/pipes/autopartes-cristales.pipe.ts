import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autopartesCristales'
})
export class AutopartesCristalesPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const detalles = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const detalle of value){
      if (detalle.turno.vehiculo.patente.toLowerCase().indexOf(arg.toLowerCase())>-1 //letras
            //|| product.barcode==arg.
            || detalle.turno.vehiculo.modelo.toLowerCase().indexOf(arg.toLowerCase())>-1 //numero
            || detalle.turno.usuario.apellido.toLowerCase().indexOf(arg.toLowerCase())>-1
            || detalle.turno.usuario.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1) {
              detalles.push(detalle);
      }
    }
    
    return detalles;
  }
}
