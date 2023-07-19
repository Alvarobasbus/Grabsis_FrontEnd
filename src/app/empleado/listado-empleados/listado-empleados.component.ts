import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Rol } from 'src/app/models/rol';
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.css']
})
export class ListadoEmpleadosComponent implements OnInit{

  roles: Rol[];
  aRol: Rol;
  empleados: Empleado[];
  public page: number;
  empleado: Empleado;
  formulario: FormGroup;
  pass: FormGroup;
  empleadoLog: Empleado;

  filtro: any = '';

  lista:boolean;
  modificarEmpleado:boolean;

  private subscripcion =new Subscription();

  constructor(private empleadoService: EmpleadoService,
    private formBuilder: FormBuilder,
    private rolService: RolService,
    private authService: AuthService,
    private router: Router){

  }

  ngOnInit(): void {

    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleadoLog = currentEmpleado;
      if(this.empleadoLog.rol.descripcion!="Gerente"){
        this.router.navigate(['']);
      }

    })
    this.lista=true;
    this.modificarEmpleado=false,

    this.obtenerTodos()
    this.subscripcion.add(
      this.rolService.obtenerTodas().subscribe({
        next: (respuesta) => this.roles=respuesta,
        error: () => {
          
        },
      })
    );

  }

  obtenerTodos(){
    this.subscripcion.add(
      this.empleadoService.obtenerTodos().subscribe({
        next: (respuesta) =>{
         this.empleados=respuesta
        },
        error: () => {
          console.log('Error al obtener el listado de empleados');
        },
      })
    );
  }

  modificar(empleado: Empleado){
    this.empleado=empleado;


    this.formulario=this.formBuilder.group({
      documento: [,Validators.required ],
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      rol: [, Validators.required]

    })


    this.pass=this.formBuilder.group({
      contrasenia: [, Validators.required],
      contrasenia2: [, Validators.required]

    },
    {
      validators: [this.checkPasswords]
    })


    this.subscripcion.add(
      this.formulario.controls['rol'].valueChanges.subscribe({
        next: (valor) =>{
          this.rolService.obtenerPorId(valor).subscribe({
            next: (respuesta) => this.aRol = respuesta,
            error: () => console.log('error al intentar guardar el rol seleccionada')
          })
        }
      })
    )

    this.formulario.controls['nombre'].setValue(this.empleado.nombre)
    this.formulario.controls['apellido'].setValue(this.empleado.apellido)
    this.formulario.controls['documento'].setValue(this.empleado.documento)
    this.formulario.controls['nombre'].setValue(this.empleado.nombre)
    this.formulario.controls['rol'].setValue(this.empleado.rol.id)
    this.pass.controls['contrasenia'].setValue(this.empleado.contrasenia)
    this.pass.controls['contrasenia2'].setValue(this.empleado.contrasenia)

    this.lista=false;
    this.modificarEmpleado=true;

  }

  checkPasswords: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get("contrasenia");
    const password_repeat = control.get("contrasenia2");
    
    return password &&
      password_repeat &&
      password.value !== password_repeat.value
      ? { passwordCoincide: false }
      : null;
  };

  cancelar(){
    this.modificarEmpleado=false;
    this.lista=true;
  }

  eliminar(id: number){
    this.subscripcion.add(
      this.empleadoService.delete(id).subscribe({
        next: (respuesta) =>{
          Swal.fire({
            title: 'Empleado eliminado correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });
          this.obtenerTodos()
        },
        error: () => {
          Swal.fire({
            title: 'Error al eliminar el empleado',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    );
  

  }

  activar(id: number){
    this.subscripcion.add(
      this.empleadoService.activar(id).subscribe({
        next: (respuesta) =>{
          Swal.fire({
            title: 'Empleado activado Correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });
          this.obtenerTodos()
        },
        error: () => {
          Swal.fire({
            title: 'Erro al activar el empleado',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    );
  }

  guardarEmpleado(){

    if(this.empleadoLog.rol.descripcion==="Gerente"){
      if(this.formulario.invalid || this.pass.invalid){
        Swal.fire({
          title: `Debe completar todos los campos`,
          icon: 'error',
          confirmButtonText: "Ok",
        });
        return
      }
  
      this.empleado.nombre= this.formulario.controls['nombre'].value.toUpperCase();
      this.empleado.apellido= this.formulario.controls['apellido'].value.toUpperCase();
      this.empleado.documento=this.formulario.controls['documento'].value
      this.empleado.contrasenia= this.pass.controls['contrasenia'].value
      
      this.empleado.rol=this.aRol
  
      this.subscripcion.add(
        this.empleadoService.guardar(this.empleado).subscribe({
          next: ()=>{
            Swal.fire({
              title: 'Empleado Registrado Correctamente',
              icon: 'success',
              confirmButtonText: "Ok",
            });
  
            this.cancelar();
          },
          error: ()=> {
            Swal.fire({
              title: 'Error al registrar el empleado',
              icon: 'error',
              confirmButtonText: "Ok",
            });
            return
          }
        })
        
      )
      
    }else{

      Swal.fire({
        title: 'No tienes los permisos necesarios ',
        icon: 'error',
        confirmButtonText: "Ok",
      });

    }
  

    
  }

}
