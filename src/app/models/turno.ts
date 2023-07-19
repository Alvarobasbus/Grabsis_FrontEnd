import { Time } from "@angular/common";
import { Empleado } from "./empleado";
import { Formulario } from "./formulario";
import { Usuario } from "./usuario";
import { Vehiculo } from "./vehiculo";

export class Turno{
    idTurno: number;
    fecha: Date;
    hora: Time;
    pagado: boolean;
    ingreso: boolean;
    empleado: Empleado;
    usuario: Usuario;
    vehiculo: Vehiculo;
    formulario: Formulario;
    isDeleted: boolean;
}