import { Pipe, PipeTransform } from '@angular/core';

const PADDING = "000000";

@Pipe({
  name: 'precio'
})
export class PrecioPipe implements PipeTransform {

  

  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;

  constructor() {
    // TODO Puedes configurar los separadores que prefieras
    this.DECIMAL_SEPARATOR = ",";
    this.THOUSANDS_SEPARATOR = ".";
  }

  transform(value: number | string, fractionSize: number = 2): string {
    if(value==null || value==0){
      value="0"
    }
    value= value.toString().replace(/\./g,',');


    let [ integer, fraction = "" ] = (value || "").toString()
      .split(this.DECIMAL_SEPARATOR); // Divide entre parte entera y decimal, por la "," en este caso

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

    return "$" + integer + fraction;
  }

  parse(value: string, fractionSize: number = 2): string {
    value= value.toString().replace(/\./g,',');
    let [ integer, fraction = "" ] = (value || "").split(this.DECIMAL_SEPARATOR);

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    return  "$" + integer + fraction;
  }










  precio: number;

  //transform(value: any, ...args: unknown[]): unknown {

   // this.precio = value.toFixed(2)
   
  //  return  `$${this.precio}`;
  
 // }

}
