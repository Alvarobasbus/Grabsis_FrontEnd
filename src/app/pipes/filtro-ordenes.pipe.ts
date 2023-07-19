import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroOrdenes'
})
export class FiltroOrdenesPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const ordenes = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const orden of value){
      if (orden.turno.vehiculo.patente.toLowerCase().indexOf(arg.toLowerCase())>-1 //letras
            //|| product.barcode==arg.
            || (orden.turno.usuario.documento).toString().indexOf(arg.toLowerCase())>-1 //numero
            || orden.metodoPago.descripcion.toLowerCase().indexOf(arg.toLowerCase())>-1) {
              ordenes.push(orden);
      }
    }
    
    return ordenes;
  }

}
