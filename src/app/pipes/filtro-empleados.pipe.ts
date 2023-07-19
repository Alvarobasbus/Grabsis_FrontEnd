import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEmpleados'
})
export class FiltroEmpleadosPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const empleados = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const empleado of value){
      if (empleado.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1 //letras
            //|| product.barcode==arg.
            || (empleado.documento).toString().indexOf(arg.toLowerCase())>-1 //numero
            || empleado.apellido.toLowerCase().indexOf(arg.toLowerCase())>-1) {
              empleados.push(empleado);
      }
    }
    
    return empleados;
  }

}
