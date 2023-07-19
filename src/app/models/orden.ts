import { Detalle } from "./detalle";
import { Empleado } from "./empleado";
import { MetodoPago } from "./metodoPago";
import { Turno } from "./turno";

export class Orden{
    idOrden: number;
    turno:Turno;
    fecha: Date;
    total: number;
    detalle: Detalle[];
    empleado: Empleado;
    metodoPago: MetodoPago;
    isDeleted: boolean;

}