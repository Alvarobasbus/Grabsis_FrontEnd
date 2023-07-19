import { Orden } from "./orden"
import { Servicio } from "./servicio"
import { Turno } from "./turno"

export class Detalle{
    idDetalle: number
    cantidad: number=1
    precio: number
    orden: Orden
    turno: Turno
    servicio: Servicio
    fecha: Date
}