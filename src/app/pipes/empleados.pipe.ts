import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empleados'
})
export class EmpleadosPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {

    if(value===true){
      return "No activo";
    }else{
        return "Activo"
    }
   
  }

}
