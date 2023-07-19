import { Pipe, PipeTransform } from '@angular/core';
import { Orden } from '../models/orden';

@Pipe({
  name: 'ordenfiltroborrada'
})
export class OrdenfiltroborradaPipe implements PipeTransform {

  transform(value: Orden[]): Orden[] {
    const ordenes=[];

 for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if(element.isDeleted==false){
        ordenes.push(value[index])
      }
      
    }
    
    return ordenes;
  }



}
