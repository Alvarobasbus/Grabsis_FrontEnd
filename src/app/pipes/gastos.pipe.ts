import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gastos'
})
export class GastosPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const gastos = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const gasto of value){
      if (gasto.concepto.toLowerCase().indexOf(arg.toLowerCase())>-1 //letras
            //|| product.barcode==arg.
            || (gasto.importe).toString().indexOf(arg.toLowerCase())>-1) {
              gastos.push(gasto);
      }
    }
    
    return gastos;
  }

}
