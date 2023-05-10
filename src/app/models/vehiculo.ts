import { Marca } from "./marca";

export class Vehiculo{
    patente: string;
    marca?: Marca;
    modelo: string;
    motor: string;
    chasis: string;
    tipo: string;
    autopartes: number;
    cristales: number;
    isDeleted: boolean=false;
}