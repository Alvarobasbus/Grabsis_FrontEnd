import { Empleado } from "./empleado";
import {Vehiculo } from "./vehiculo";

export class Grabado{
    idGrabado: number
    vehiculo: Vehiculo;
    empleado: Empleado;
    fecha: Date
    descripcion: String
    isDeleted?: boolean;

}