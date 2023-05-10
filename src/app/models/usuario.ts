import { Provincia } from "./provincia";

export class Usuario{
    documento: number;
    nombre: string;
    apellido: string;
    telefono: number;
    email: string;
    domicilio: string;
    provincia?: Provincia;
   //idProvincia?: number;
   isDeleted: boolean=false;

}