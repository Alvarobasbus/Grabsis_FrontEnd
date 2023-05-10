import { Rol } from "./rol";

export class Empleado{
    idEmpleado: number;
    documento: number;
    nombre: string;
    apellido: string;
    contrasenia: string;
    rol: Rol;
    isDeleted: boolean;

}