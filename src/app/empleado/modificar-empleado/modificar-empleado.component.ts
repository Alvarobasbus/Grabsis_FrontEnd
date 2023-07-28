import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Rol } from 'src/app/models/rol';
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-empleado',
  templateUrl: './modificar-empleado.component.html',
  styleUrls: ['./modificar-empleado.component.css']
})
export class ModificarEmpleadoComponent implements OnInit {
  
  roles: Rol[];
  aRol: Rol;
  empleados: Empleado[];
  public page: number;
  empleado: Empleado;
  formulario: FormGroup;
  pass: FormGroup;
  empleadoLog: Empleado;
  isLogin: boolean=false;
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
    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)
 

    if(this.isLogin==false){
        this.router.navigate(['']);
      }
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

    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleado = currentEmpleado;
    })
  

    this.setEmpleado();



  }

  setEmpleado(){
    this.formulario.controls['nombre'].setValue(this.empleado.nombre)
    this.formulario.controls['apellido'].setValue(this.empleado.apellido)
    this.formulario.controls['documento'].setValue(this.empleado.documento)
    this.formulario.controls['nombre'].setValue(this.empleado.nombre)
    this.formulario.controls['rol'].setValue(this.empleado.rol.descripcion)
    this.pass.controls['contrasenia'].setValue(this.empleado.contrasenia)
    this.pass.controls['contrasenia2'].setValue(this.empleado.contrasenia)
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

 

 

  guardarEmpleado(){

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
      
  
      this.subscripcion.add(
        this.empleadoService.guardar(this.empleado).subscribe({
          next: ()=>{
            Swal.fire({
              title: 'Datos modificados Correctamente',
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
      


    
  }

  cancelar(){
    this.router.navigate(['empleado']);
  }


}