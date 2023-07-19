import { Empleado } from "./empleado";
import { Insumo } from "./insumo";

export class DetalleInsumo{
    idDetalleInsumo: number;
    alta: boolean;
    fecha: Date;
    numero: number;
    empleado: Empleado;
    insumo: Insumo;

}