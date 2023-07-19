import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registrar-ingreso',
  templateUrl: './registrar-ingreso.component.html',
  styleUrls: ['./registrar-ingreso.component.css']
})
export class RegistrarIngresoComponent implements OnInit {

  public page: number;
  formulario: FormGroup;
  turnos: Turno[];
  currentDate: any;
  private subscripcion =new Subscription();
  fecha: any;

  filterTurno: any = '';
  

  constructor(private turnoservice: TurnoService,
    private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router){
  }

  ngOnInit(): void {

  this.currentDate = new Date();
  this.fecha = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');  
  console.log(this.fecha)

  this.obtener()

  }
  registrarTurno(){
    this.router.navigate(['turno']);
  }

  obtener(){
    this.subscripcion.add(
      this.turnoservice.obtenerPorFecha(this.fecha).subscribe({
        next: (respuesta) =>{
          this.turnos=respuesta
        } ,
        error: () => {
          console.log('No se encontraron turnos para la fecha: ' + this.fecha );
        },
      })
    )
  }

  confirmarIngreso(turno: Turno){

    turno.ingreso=true;

    Swal.fire({
      title: `¿Desea Confirmar el Ingreso del Vehiculo?`  ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){ 

        this.subscripcion.add(
          this.turnoservice.confirmar(turno).subscribe({
            next: (respuesta) =>{
              console.log('turno confirmado con exito')
              this.obtener()
            } ,
            error: () => {
              console.log('Error al intentar confirmar el turno' );
            },
          })
        )
      }
    })


  }

  eliminar(id: number){
    this.subscripcion.add(
      this.turnoservice.delete(id).subscribe({
        next: () =>{
          console.log('Turno eliminado correctamente')
          this.obtener()


        },
        error: () => {
          console.log('Error al eliminar el turno');
        },
      })
    );
    
  }

}
