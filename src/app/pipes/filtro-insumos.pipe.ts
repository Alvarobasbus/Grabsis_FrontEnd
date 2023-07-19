import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroInsumos'
})
export class FiltroInsumosPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const insumos = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const insumo of value){
      if (insumo.descripcion.toLowerCase().indexOf(arg.toLowerCase())>-1 //letras
            //|| product.barcode==arg.
            || (insumo.cantidad).toString().indexOf(arg.toLowerCase())>-1) {
              insumos.push(insumo);
      }
    }
    
    return insumos;
  }

}
