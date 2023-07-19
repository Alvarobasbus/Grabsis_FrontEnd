import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnos'
})
export class FiltroTurnosPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const turnos = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const turno of value){
      if (turno.vehiculo.patente.toLowerCase().indexOf(arg.toLowerCase())>-1 //letras
            //|| product.barcode==arg.
            || (turno.fecha).toString().indexOf(arg.toLowerCase())>-1 //numero
            || (turno.hora).toString().indexOf(arg.toLowerCase())>-1
            || turno.vehiculo.modelo.toLowerCase().indexOf(arg.toLowerCase())>-1
            || turno.usuario.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1
            || turno.usuario.apellido.toLowerCase().indexOf(arg.toLowerCase())>-1) {
              turnos.push(turno);
      }
    }
    
    return turnos;
  }

}
