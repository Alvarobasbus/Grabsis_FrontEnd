import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Egreso } from 'src/app/models/egreso';
import { AuthService } from 'src/app/services/auth.service';
import { EgresoService } from 'src/app/services/egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-gastos',
  templateUrl: './listado-gastos.component.html',
  styleUrls: ['./listado-gastos.component.css']
})
export class ListadoGastosComponent implements OnInit {

  isLogin: boolean=false;
  formulario: FormGroup;
  formulario2: FormGroup;

  modi: boolean;

  hoy= new Date;
  pipe = new DatePipe('en-US');
  fechaHoy:any;
  egresos: Egreso[];
  fecha1: any;
  fecha2: any;
  public page: number;
  resul: boolean;
  busqueda: boolean;
  egreso: Egreso;
  filter: any = '';
  idEgreso: number;

  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder,
    private egresoService: EgresoService,
    private authService: AuthService,
    private router: Router){

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)
 

    if(this.isLogin==false){
        this.router.navigate(['']);
      }
    this.modi=false;
    this.busqueda=true;
    this.resul=false;
    this.formulario=this.formBuilder.group({
      fecha1: [, Validators.required],
      fecha2: [, Validators.required]

    })

    this.formulario2=this.formBuilder.group({
      fecha: [, Validators.required],
      numeroFactura: [, Validators.required],
      concepto: [, Validators.required],
      importe: [, Validators.required],
      tipoFactura: [, Validators.required]

    })

    this.setFechaActual()

  }

  modificar(gasto: Egreso){
    this.formulario2.patchValue(gasto)   
    this.busqueda=false;
    this.resul=false;
    this.idEgreso=gasto.idEgreso
    this.modi=true;

  }

  modificarEgreso(){

    if(this.formulario2.invalid || this.formulario2.controls['tipoFactura'].value==="value1"){
      Swal.fire({
        title: 'Debe ingresar correctamente todos los campos',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    this.egreso=this.formulario2.value
    this.egreso.idEgreso=this.idEgreso;
    

    this.subscripcion.add(
      this.egresoService.guardar(this.egreso).subscribe({
        next: respuesta =>{
          Swal.fire({
            title: `Egreso modificador correctamente`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
          }).then((result) =>{
            if(result.isConfirmed){ 
              this.cancelar();
            }
          })

          
        } ,
        error: (e) => {
          Swal.fire({
            title: 'error intentar guardar el egreso',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    )


  }

  cancelar(){
    this.modi=false;
    this.busqueda=true
    this.resul=true
    this.buscar()
  }

  eliminar(gasto: Egreso){
    Swal.fire({
      title: `¿Desea Eliminar el gasto:  ${gasto.concepto}?`  ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){ 

        this.subscripcion.add(
          this.egresoService.eliminar(gasto.idEgreso).subscribe({
            next: (respuesta) =>{
              this.buscar()
            } ,
            error: () => {
            },
          })
        )
      }
    })



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
      this.egresoService.obtenerPorFechas(this.fecha1,this.fecha2).subscribe({
        next: (respuesta) =>{
          this.egresos=respuesta;
      

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





    console.log(this.formulario.controls['fecha2'].value)

  }


}
