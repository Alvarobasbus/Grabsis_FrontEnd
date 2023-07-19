import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroporusuario'
})
export class FiltroporusuarioPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const turnos = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const turno of value){
      if (turno.vehiculo.patente.toLowerCase().indexOf(arg.toLowerCase())>-1 //letras
            //|| product.barcode==arg.
            || turno.vehiculo.modelo.toLowerCase().indexOf(arg.toLowerCase())>-1) {
              turnos.push(turno);
      }
    }
    
    return turnos;
  }

}
