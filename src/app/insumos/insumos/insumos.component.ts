import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetalleInsumo } from 'src/app/models/detalleInsumo';
import { Empleado } from 'src/app/models/empleado';
import { Insumo } from 'src/app/models/insumo';
import { AuthService } from 'src/app/services/auth.service';
import { InsumoService } from 'src/app/services/insumo.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {


  fecha: any;
  currentDate: any;
  insumos: Insumo[];
  insumo: Insumo;
  formulario: FormGroup;
  formulario2: FormGroup;
  hoy: Date;
  numero: number;
  detalle: DetalleInsumo;
  filter: any = '';
  modi:boolean;
  isLogin: boolean=false;
  currentID: number=0;
  empleado: Empleado;

  public page: number;
  
  private subscripcion =new Subscription();

  empleadoLog: Empleado;

  constructor(private insumoService: InsumoService, private formBuilder: FormBuilder, private datePipe: DatePipe,
    private router: Router,
    private authService: AuthService){

  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)
 

    if(this.isLogin==false){
        this.router.navigate(['']);
      }
    this.modi=false;

    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleadoLog = currentEmpleado;
    })
    this.currentDate = new Date();
    this.fecha = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');  

    this.obtenerListado()

    this.formulario=this.formBuilder.group({
      descripcion: [, Validators.required],
      cantidad: [, Validators.required]
    })

    this.formulario2=this.formBuilder.group({
      numero: [, Validators.required]
    })


    
  }

  registrar(){
    this.modi=true;
  }
  cerrar(){
    this.formulario.controls['descripcion'].setValue("");
          this.formulario.controls['cantidad'].setValue("");   
          this.obtenerListado();
    this.modi=false
  }

  obtenerListado(){
    this.subscripcion.add(
      this.insumoService.obtenerTodos().subscribe({
        next: (respuesta) =>{
          this.insumos=respuesta
        } ,
        error: () => {
          console.log('Error al obtener el listado de insumos' );
        },
      })
    );

  }

  guardar(){
    if(this.formulario.invalid){
      Swal.fire({
        title: 'Debe introducir la descripcion y cantidad ',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    this.insumo=this.formulario.value;
    this.insumo.descripcion=this.formulario.controls['descripcion'].value.toUpperCase();


    this.subscripcion.add(
      this.insumoService.guardar(this.insumo).subscribe({
        next: ()=>{
          Swal.fire({
            title: 'Insumo guardado correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });
          this.formulario.controls['descripcion'].setValue("");
          this.formulario.controls['cantidad'].setValue("");   
          this.obtenerListado(); 
          //this.modi=false;
         // window.location.reload()
        },
        error: (err)=> {
         alert(err.error.message)
        }
      })
      
    )
  }

  control(){
    if(this.numero == null){
      Swal.fire({
        title: 'Debe ingresar un numero',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }
    if( this.numero ===0){
      Swal.fire({
        title: 'El numero debe ser mayor a cero',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

  }

  aumentar(insumo: Insumo){
    if(this.formulario2.controls['numero'].value===null || this.formulario2.controls['numero'].value==0){
      Swal.fire({
        title: 'Debe introducir correctamente el numero',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

   this.numero=this.formulario2.controls['numero'].value
    this.control()
    this.insumo=insumo
   
   this.insumo.cantidad+=this.numero;
  

      
    Swal.fire({
      title: `¿Desea aumentar ${this.numero} unidades del insumo ${insumo.descripcion}?`  ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){

        console.log(this.insumo)

        this.subscripcion.add(
          this.insumoService.aumentar(this.insumo).subscribe({
            next: ()=>{
              Swal.fire({
                title: 'El aumento de la cantidad del insumo fue registrado correctamente',
                icon: 'success',
                confirmButtonText: "Ok",
              });

              console.log(this.insumo)

              this.detalle=new DetalleInsumo()

              this.detalle.alta=true;
              this.detalle.insumo=this.insumo
              this.detalle.numero=this.numero
              this.detalle.empleado=this.empleadoLog


              this.subscripcion.add(
                this.insumoService.guardarDetalle(this.detalle).subscribe({
                  next: ()=>{
                    console.log('Detalle guardado con exito')
                  },
                  error: (err)=> {
                   alert(err.error.message)
                  }
                })
                
              )
       
              this.formulario2.controls['numero'].setValue("")
              this.obtenerListado()

            },
            error: ()=> {
              Swal.fire({
                title: 'Error al aumentar la cantidad del insumo',
                icon: 'error',
                confirmButtonText: "Ok",
              });
            }
          })   
        )
      }
    })   
    }

      


  restar(insumo: Insumo){
    if(this.formulario2.controls['numero'].value===null || this.formulario2.controls['numero'].value==0){
      Swal.fire({
        title: 'Debe introducir correctamente el numero',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }
    this.numero=this.formulario2.controls['numero'].value
    this.control()

    this.insumo=insumo

    if(this.insumo.cantidad>=this.numero){
    
      this.insumo.cantidad-=this.numero
      //

      Swal.fire({
        title: `¿Desea descontar ${this.numero} unidades del insumo ${insumo.descripcion}?`  ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) =>{
        if(result.isConfirmed){
  
          this.subscripcion.add(
            this.insumoService.restar(this.insumo).subscribe({
              next: ()=>{
                Swal.fire({
                  title: 'La modificacion de la cantidad del insumo fue registrado correctamente',
                  icon: 'success',
                  confirmButtonText: "Ok",
                });


                this.detalle=new DetalleInsumo()

                this.detalle.alta=false;
                this.detalle.insumo=this.insumo
                this.detalle.numero=this.numero
  
  
                this.subscripcion.add(
                  this.insumoService.guardarDetalle(this.detalle).subscribe({
                    next: ()=>{
                      console.log('Detalle guardado con exito')
                    },
                    error: (err)=> {
                     alert(err.error.message)
                    }
                  })
                  
                )
  
                this.formulario2.controls['numero'].setValue("")
                this.obtenerListado()
  
              },
              error: ()=> {
                Swal.fire({
                  title: 'Error al disminuir la cantidad de stock del insumo',
                  icon: 'error',
                  confirmButtonText: "Ok",
                });
              }
            })   
          )
        }
      })   



      //
    }else{

      Swal.fire({
        title: 'El numero de bajas de insumos debe ser igual o menor a la cantidad actual en stock',
        icon: 'error',
        confirmButtonText: "Ok",
      });

    }

  }



}
