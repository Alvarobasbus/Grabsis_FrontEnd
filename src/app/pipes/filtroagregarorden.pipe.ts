import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroagregarorden'
})
export class FiltroagregarordenPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const ordenes = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const orden of value){
      if (orden.vehiculo.patente.toLowerCase().indexOf(arg.toLowerCase())>-1 //letras
            //|| product.barcode==arg.
            || orden.usuario.apellido.toLowerCase().indexOf(arg.toLowerCase())>-1
            || orden.usuario.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1 //numero
            || orden.vehiculo.modelo.toLowerCase().indexOf(arg.toLowerCase())>-1) {
              ordenes.push(orden);
      }
    }
    
    return ordenes;
  }

}
