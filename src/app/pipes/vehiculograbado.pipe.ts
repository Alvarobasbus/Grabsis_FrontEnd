import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehiculograbado'
})
export class VehiculograbadoPipe implements PipeTransform {


  transform(value: any, arg : any ):any {

    const grabados = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const grabado of value){
      if (grabado.vehiculo.patente.toLowerCase().indexOf(arg.toLowerCase())>-1 //letras
            //|| product.barcode==arg.
            || grabado.descripcion.toLowerCase().indexOf(arg.toLowerCase())>-1 //numero
            || grabado.vehiculo.modelo.toLowerCase().indexOf(arg.toLowerCase())>-1) {
              grabados.push(grabado);
      }
    }
    
    return grabados;
  }

}
