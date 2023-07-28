import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Deposito } from 'src/app/models/deposito';
import { AuthService } from 'src/app/services/auth.service';
import { DepositoService } from 'src/app/services/deposito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-depositos',
  templateUrl: './listado-depositos.component.html',
  styleUrls: ['./listado-depositos.component.css']
})
export class ListadoDepositosComponent implements OnInit{

  isLogin: boolean=false;
  formulario: FormGroup;
  formulario2: FormGroup;

  modi: boolean;

  hoy= new Date;
  pipe = new DatePipe('en-US');
  fechaHoy:any;
  depositos: Deposito[];
  fecha1: any;
  fecha2: any;
  public page: number;
  resul: boolean;
  busqueda: boolean;
  deposito: Deposito;
  idDeposito: number;

  private subscripcion =new Subscription();
  
constructor(private formBuilder: FormBuilder,
  private depositoService: DepositoService,
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
    importe: [, Validators.required],
    banco: [, Validators.required],
    numeroTramite: [, Validators.required]

  })

  this.setFechaActual()

}


setFechaActual(){
  this.fechaHoy= this.pipe.transform(this.hoy, 'YYYY-MM-dd');
   this.formulario.controls['fecha1'].setValue(this.fechaHoy)
   this.formulario.controls['fecha2'].setValue(this.fechaHoy)

   this.buscar()
 }

 modificar(deposito: Deposito){
  this.formulario2.patchValue(deposito)   
  this.busqueda=false;
  this.resul=false;
  this.idDeposito=deposito.idDeposito
  this.modi=true;

}

eliminar(deposito: Deposito){
  Swal.fire({
    title: `¿Desea Eliminar el deposito?`  ,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then((result) =>{
    if(result.isConfirmed){ 

      this.subscripcion.add(
        this.depositoService.eliminar(deposito.idDeposito).subscribe({
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
    this.depositoService.obtenerPorFechas(this.fecha1,this.fecha2).subscribe({
      next: (respuesta) =>{
        this.depositos=respuesta;

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


modificarDeposito(){
  if(this.formulario2.controls['importe'].value<=100){
    Swal.fire({
      title: 'el importe depositado debe ser mayor a $100 ',
      icon: 'error',
      confirmButtonText: "Ok",
    });
    return
  }

  if(this.formulario2.invalid){
    Swal.fire({
      title: 'Debe ingresar correctamente todos los campos',
      icon: 'error',
      confirmButtonText: "Ok",
    });
    return
  }

  this.deposito=this.formulario2.value
  this.deposito.idDeposito=this.idDeposito;
  

  this.subscripcion.add(
    this.depositoService.guardar(this.deposito).subscribe({
      next: respuesta =>{
        Swal.fire({
          title: `Deposito modificador correctamente`,
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
          title: 'error intentar modificar el Deposito',
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
 

}
