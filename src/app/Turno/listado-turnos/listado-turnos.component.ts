import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit{
  public page: number;
  formulario: FormGroup;
  pipe = new DatePipe('en-US');
  fecha: Date;
  fecha1: any;
  fecha2: any;
  turnos: Turno[];
  fechaHoy:any;
  private subscripcion =new Subscription();
  resul: boolean;
  busqueda: boolean;
 
  hoy= new Date;
  
  filterTurno: any = '';
  isLogin: boolean=false;
currentID: number=0;
empleado: Empleado;


  constructor(private turnoservice: TurnoService,
    private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService){

  }

  ngOnInit(): void {

    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)
    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleado = currentEmpleado;
      this.currentID= this.empleado.idEmpleado
    })

  if(this.isLogin==false){
      this.router.navigate(['']);
    }
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
          this.resul=false;
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
    console.log("este es el id")
    console.log(id)

    this.subscripcion.add(
      this.turnoservice.delete(id).subscribe({
        next: (respuesta) =>{
          Swal.fire({
            title: 'Turno Eliminado correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });
        this.buscar()


        },
        error: (e) => {
          Swal.fire({
            title: `${e.error.message}`,
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    );
    
  }

}
