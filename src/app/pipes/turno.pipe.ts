import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoturno'
})
export class TurnoPipe implements PipeTransform {

  transform(value: any, arg : any, arg2: any): any {

   
    if(value===true){
      return "CANCELADO"
    }

    if(arg===true){
      return "PAGADO"
    }

    if(arg===false && value===false && arg2==false){
      return "PENDIENTE"
    }

    if(arg===false && value===false && arg2==true){
      return "INGRESADO"
    }

  }

}
