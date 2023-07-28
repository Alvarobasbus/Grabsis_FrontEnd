import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Detalle } from 'src/app/models/detalle';
import { Empleado } from 'src/app/models/empleado';
import { Grabado } from 'src/app/models/grabado';
import { AuthService } from 'src/app/services/auth.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { GrabadoService } from 'src/app/services/grabado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-grabar',
  templateUrl: './listado-grabar.component.html',
  styleUrls: ['./listado-grabar.component.css']
})
export class ListadoGrabarComponent implements OnInit{

  formulario: FormGroup;

  empleadoLog: Empleado;

  hoy= new Date;
  pipe = new DatePipe('en-US');
  fechaHoy:any;
  fecha1: any;
  fecha2: any;
  public page: number;
  resul: boolean;
  busqueda: boolean;
  grabados: Grabado[];

  filter: any = '';
  isLogin: boolean=false;


  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private detalleService: DetalleService,
    private grabadoService: GrabadoService,
    private router: Router){

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)
 

    if(this.isLogin==false){
        this.router.navigate(['']);
      }

    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleadoLog = currentEmpleado;
    })

    this.busqueda=true;
    this.resul=false;
    this.formulario=this.formBuilder.group({
      fecha1: [, Validators.required],
      fecha2: [, Validators.required],
      patente: []

    })

    this.setFechaActual()

 
  }


  setFechaActual(){
    // this.fechaHoy= this.pipe.transform(this.hoy, 'dd/MM/YYYY');
    this.fechaHoy= this.pipe.transform(this.hoy, 'YYYY-MM-dd');
     this.formulario.controls['fecha1'].setValue(this.fechaHoy)
     this.formulario.controls['fecha2'].setValue(this.fechaHoy)
     this.buscar()
   }

   buscar(){
    if(this.formulario.controls['patente'].value==null || this.formulario.controls['patente'].value.trim().length ===0){
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
        this.grabadoService.obtenerPorFechas(this.fecha1,this.fecha2).subscribe({
          next: (respuesta) =>{
            this.grabados=respuesta;
  
  
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

     if(this.formulario.controls['patente'].value!=null){

      this.subscripcion.add(
        this.grabadoService.obtenerPorPatente(this.formulario.controls['patente'].value).subscribe({
          next: (respuesta) =>{
            this.grabados=respuesta;
  
            
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

  
    


  }

  

}
