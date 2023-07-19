import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Detalle } from 'src/app/models/detalle';
import { Empleado } from 'src/app/models/empleado';
import { Grabado } from 'src/app/models/grabado';
import { Orden } from 'src/app/models/orden';
import { Turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { GrabadoService } from 'src/app/services/grabado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-grabado-cristales',
  templateUrl: './registrar-grabado-cristales.component.html',
  styleUrls: ['./registrar-grabado-cristales.component.css']
})
export class RegistrarGrabadoCristalesComponent implements OnInit {
  formulario: FormGroup;

  modi: boolean;

  empleadoLog: Empleado;

  filter: any = '';

  hoy= new Date;
  pipe = new DatePipe('en-US');
  fechaHoy:any;
  fecha1: any;
  fecha2: any;
  public page: number;
  resul: boolean;
  busqueda: boolean;
  turno: Turno;
  idOrden: number;
  orden: Orden;
  detalles: Detalle[];
  grabado: Grabado;



  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private detalleService: DetalleService,
    private grabadoService: GrabadoService){

  }

  ngOnInit(): void {
    this.traerDetalles()

    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleadoLog = currentEmpleado;
    })

    this.modi=false;
    this.busqueda=true;
    this.resul=false;
    this.formulario=this.formBuilder.group({
      fecha1: [, Validators.required],
      fecha2: [, Validators.required]

    })

    this.setFechaActual()

 
  }

  traerDetalles(){
    this.subscripcion.add(
      this.detalleService.obtenerTodas().subscribe({
        next: (respuesta) =>{
         this.detalles=respuesta;
        },
        error: () => {
          console.log('no fue posible traer la lista de detalles')

        },
      })
    );
  }

  setFechaActual(){
    // this.fechaHoy= this.pipe.transform(this.hoy, 'dd/MM/YYYY');
    this.fechaHoy= this.pipe.transform(this.hoy, 'YYYY-MM-dd');
     this.formulario.controls['fecha1'].setValue(this.fechaHoy)
     this.formulario.controls['fecha2'].setValue(this.fechaHoy)
     this.buscar()
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
      this.detalleService.obtenerPorFechas(this.fecha1,this.fecha2).subscribe({
        next: (respuesta) =>{
          this.detalles=respuesta;


          if(respuesta!=null){
            this.resul=true;
          }
          
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


   confirmarCristales(det: Detalle){
    this.grabado=new Grabado;
    this.grabado.empleado=this.empleadoLog
    this.grabado.vehiculo=det.turno.vehiculo;
    console.log(this.grabado)

    Swal.fire({
      title: `¿Desea Confirmar el grabado de autopartes del vehiculo ${det.turno.vehiculo.patente}`  ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){ 

        this.subscripcion.add(
          this.grabadoService.grabadoCristales(this.grabado).subscribe({
            next: (respuesta) =>{
              this.buscar()
            } ,
            error: () => {
              console.log('Error al intentar guardar el Grabado' );
            },
          })
        )
      }
    })
  



   }

}
