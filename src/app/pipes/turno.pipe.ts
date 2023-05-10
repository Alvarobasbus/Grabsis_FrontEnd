import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoturno'
})
export class TurnoPipe implements PipeTransform {

  transform(value: any, arg : any): any {

   
    if(value===true){
      return "CANCELADO"
    }

    if(arg===true){
      return "PAGADO"
    }

    if(arg===false && value===false){
      return "PENDIENTE"
    }

  }

}
