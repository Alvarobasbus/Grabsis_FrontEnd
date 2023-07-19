import { Marca } from "./marca";

export class Vehiculo{
    patente: string;
    marca: Marca;
    modelo: string;
    motor: string;
    chasis: string;
    tipo: string;
    autopartes: boolean;
    cristales: boolean;
    isDeleted: boolean=false;
}