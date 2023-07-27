import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-ingresos',
  templateUrl: './listado-ingresos.component.html',
  styleUrls: ['./listado-ingresos.component.css']
})
export class ListadoIngresosComponent {

  
  public page: number;
  formulario: FormGroup;
  turnos: Turno[];
  fecha1: any;
  fecha2: any;
  currentDate: any;
  private subscripcion =new Subscription();
  pipe = new DatePipe('en-US');
  fecha: Date;
  fechaHoy:any;
  hoy= new Date;
  
  filterTurno: any = '';

  constructor(private turnoservice: TurnoService,
    private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router){
  }

  ngOnInit(): void {

    this.formulario=this.formBuilder.group({
      fecha1: [, Validators.required],
      fecha2: [, Validators.required]

    })



    this.setFechaActual()
    this.buscar()

  }

  setFechaActual(){
    this.fechaHoy= this.pipe.transform(this.hoy, 'YYYY-MM-dd');
     this.formulario.controls['fecha1'].setValue(this.fechaHoy)
     this.formulario.controls['fecha2'].setValue(this.fechaHoy)
   }

   buscar(){

    if(this.formulario.invalid){
      Swal.fire({
        title: 'Debe ingresar correctamente ambas fechas',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    if(this.formulario.controls['fecha2'].value>this.fechaHoy){
      Swal.fire({
        title: 'La fecha maxima de busqueda no puede ser mayor a la fecha actual',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
      
    }

    if(this.formulario.controls['fecha2'].value<this.formulario.controls['fecha1'].value){
      Swal.fire({
        title: 'La fecha ingresada en el campo desde no puede ser mayor a la fecha del campo hasta',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    this.fecha1=this.formulario.controls['fecha1'].value;
    this.fecha2=this.formulario.controls['fecha2'].value


    this.subscripcion.add(
      this.turnoservice.obtenerPorFechas(this.fecha1,this.fecha2).subscribe({
        next: (respuesta) =>{
          this.turnos=respuesta;
          
        },
        error: () => {
          Swal.fire({
            title: 'Erro al obtener el listado',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    );

  }

  eliminar(id: number){


    this.subscripcion.add(
      this.turnoservice.delete(id).subscribe({
        next: () =>{
          Swal.fire({
            title: 'Turno eliminado correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });
          this.buscar()
          this.formulario.controls['fecha'].setValue("");
        },
        error: () => {
          console.log('Error al turno el empleado');
        },
      })
    );
    
  }

}
