import { Empleado } from "./empleado";
import { Usuario } from "./usuario";
import { Vehiculo } from "./vehiculo";

export class Turno{
    id: number;
    fecha: Date;
    hora: string;
    pagado: boolean;
    ingreso: boolean;
    empleado: Empleado;
    usuario: Usuario;
    vehiculo: Vehiculo;
    formulario: string;


}