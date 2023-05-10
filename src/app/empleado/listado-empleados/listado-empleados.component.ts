import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.css']
})
export class ListadoEmpleadosComponent implements OnInit{

  empleados: Empleado[];
  public page: number;

  private subscripcion =new Subscription();

  constructor(private empleadoService: EmpleadoService){

  }

  ngOnInit(): void {

    this.obtenerTodos()

  }

  obtenerTodos(){
    this.subscripcion.add(
      this.empleadoService.obtenerTodos().subscribe({
        next: (respuesta) =>{
         this.empleados=respuesta
        },
        error: () => {
          alert('Error al obtener el listado de empleados');
        },
      })
    );
  }

  modificar(){

  }

  eliminar(id: number){
    this.subscripcion.add(
      this.empleadoService.delete(id).subscribe({
        next: (respuesta) =>{
          alert('Empleado eliminado correctamente')
          this.obtenerTodos()
        },
        error: () => {
          alert('Error al borrar el empleado');
        },
      })
    );
  

  }

  activar(id: number){
    this.subscripcion.add(
      this.empleadoService.activar(id).subscribe({
        next: (respuesta) =>{
          alert('Empleado activado correctamente')
          this.obtenerTodos()
        },
        error: () => {
          alert('Error al activar el empleado');
        },
      })
    );
  }

}
