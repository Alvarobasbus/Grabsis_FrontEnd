import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Servicio } from 'src/app/models/servicio';
import { PrecioPipe } from 'src/app/pipes/precio.pipe';
import { PreciosinsPipe } from 'src/app/pipes/preciosins.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-servicio',
  templateUrl: './panel-servicio.component.html',
  styleUrls: ['./panel-servicio.component.css']
})
export class PanelServicioComponent implements OnInit {

  formulario: FormGroup;
  formActualizar: FormGroup;
  servicios: Servicio[];
  servicio: Servicio;
  servicio2: Servicio;
  isLogin: boolean=false;
currentID: number=0;
empleado: Empleado;

  private subscripcion =new Subscription();


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private serviciosService: ServiciosService,
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
      descripcion: [, Validators.required],
      precio: [, Validators.required]
    })

    this.formActualizar=this.formBuilder.group({
      servicio: [, Validators.required],
      precio: [, Validators.required]
    })


    this.obtenerServicios();
    
    this.formActualizar.controls['servicio'].setValue(0);






    this.subscripcion.add(
      this.formActualizar.controls['servicio'].valueChanges.subscribe({
        next: (valor) =>{
          if(valor!=0){
            this.serviciosService.obtenerPorId(valor).subscribe({
              next: (respuesta) =>{
                let filterpipe2= new PreciosinsPipe()
                this.servicio2 = respuesta
                this.formActualizar.controls['precio'].setValue(this.servicio2.precio)
               // this.formActualizar.controls['precio'].setValue(this.servicio2.precio)
               
   
              },
              error: () => console.log('error al intentar traer el servicio seleccionado')
            })


          }

        }
      })
    )


  }

  id(id: number){
    console.log(id);

  }

  obtenerServicios(){
    this.subscripcion.add(
      this.serviciosService.obtenerTodos().subscribe({
        next: (respuesta) =>{
          this.servicios=respuesta
        } ,
        error: () => {
          console.log('Error al obtener el listado de servicios' );
        },
      })
    );

  }



  agregarServicio(){

    if(this.formulario.invalid){
      Swal.fire({
        title: 'Debe introducir la descripcion y el precio ',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

  

    this.servicio=this.formulario.value;
    this.servicio.descripcion=this.formulario.controls['descripcion'].value.toUpperCase()



    this.subscripcion.add(
      this.serviciosService.guardar(this.servicio).subscribe({
        next: ()=>{
          Swal.fire({
            title: 'Servicio guardado correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });
          this.obtenerServicios();
          this.cancelar();
        },
        error: (err)=> {
          Swal.fire({
            title: err.error.message,
            icon: 'error',
            confirmButtonText: "Ok",
          });
        }
      })
      
    )
    
    

  }

  actualizarPrecio(){

    if(this.formActualizar.invalid){
      Swal.fire({
        title: 'Debe seleccionar la descripcion y el precio ',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    if(this.servicio2.precio===  this.formActualizar.controls['precio'].value){
      Swal.fire({
        title: 'Debe modificar el precio',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    this.servicio2.precio = this.formActualizar.controls['precio'].value

    this.subscripcion.add(
      this.serviciosService.actualizar(this.servicio2).subscribe({
        next: ()=>{
          Swal.fire({
            title: 'Servicio actualizado correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });
          this.formActualizar.controls['precio'].setValue("")
          this.formActualizar.controls['servicio'].setValue(0);

        },
        error: (err)=> {
         Swal.fire({
          title: err.error.message,
          icon: 'error',
          confirmButtonText: "Ok",
        });

        }
      })
      
    )

  }

  cancelar(){
    this.formulario.controls['descripcion'].setValue("")
    this.formulario.controls['precio'].setValue("")
    this.servicio=new Servicio;
  }

}
