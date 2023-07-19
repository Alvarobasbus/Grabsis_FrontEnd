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
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit{

  empleado: Empleado;
  roles: Rol[];
  formulario: FormGroup;
  pass: FormGroup;
  formDni: FormGroup
  aRol: Rol;
  registro: boolean=false;
  private subscripcion =new Subscription();

  empleadoLog: Empleado;
  

  constructor(private formBuilder: FormBuilder, private router: Router, private empleadoervice: EmpleadoService,
    private rolservice: RolService,
    private authService: AuthService){

  }

  ngOnInit(): void {

    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleadoLog = currentEmpleado;
      if(this.empleadoLog.rol.descripcion!="Gerente"){
        this.router.navigate(['']);
      }

    })

    this.formulario=this.formBuilder.group({
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


    this.formDni=this.formBuilder.group({
      documento: [, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    }
    )

    this.desactivarEmpleado()



    
    this.formDni.valueChanges.subscribe({
      next: (valor) =>{
        this.desactivarEmpleado();
        this.limpiar();
        this.registro=false;
        
        if(this.formDni.valid){
          console.log(this.formDni.controls['documento'].value)

          this.subscripcion.add(
            this.empleadoervice.obtenerPorDocumento(this.formDni.controls['documento'].value).subscribe({
              next: (respuesta) =>{
                console.log(respuesta)
                Swal.fire({
                  title: `El numero de documento ${this.formDni.controls['documento'].value} ya se encuentra registrado`,
                  icon: 'error',
                  confirmButtonText: "Ok",
                });
              }, 
              error: () => {
                this.activarEmpleado();
              },
            })
          );
        }
      }
    })


    this.subscripcion.add(
      this.rolservice.obtenerTodas().subscribe({
        next: (respuesta) => this.roles=respuesta,
        error: () => {
          
        },
      })
    );



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

  desactivarEmpleado(){
    this.formulario.controls['nombre'].disable();
    this.formulario.controls['apellido'].disable();
    this.pass.controls['contrasenia'].disable();
    this.pass.controls['contrasenia2'].disable();
    this.formulario.controls['rol'].disable();
  }

  activarEmpleado(){
    this.registro=true;
    this.formulario.controls['nombre'].enable();
    this.formulario.controls['apellido'].enable();
    this.pass.controls['contrasenia'].enable();
    this.pass.controls['contrasenia2'].enable();
    this.formulario.controls['rol'].enable();

    this.subscripcion.add(
      this.formulario.controls['rol'].valueChanges.subscribe({
        next: (valor) =>{
          this.rolservice.obtenerPorId(valor).subscribe({
            next: (respuesta) => this.aRol = respuesta,
            error: () => console.log('error al intentar guardar el rol seleccionada')
          })
        }
      })
    )
  }

  limpiar(){
    this.formulario.controls['nombre'].setValue("");
    this.formulario.controls['apellido'].setValue("");
    this.pass.controls['contrasenia'].setValue("");
    this.pass.controls['contrasenia2'].setValue("");
    this.formulario.controls['rol'].setValue("");
  }

  guardarEmpleado(){
    if(this.formulario.invalid || this.pass.invalid || this.formDni.invalid){
      Swal.fire({
        title: `Debe completar todos los campos`,
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }
    this.empleado=this.formulario.value
    this.empleado.nombre= this.formulario.controls['nombre'].value.toUpperCase();
    this.empleado.apellido= this.formulario.controls['apellido'].value.toUpperCase();
    this.empleado.documento=this.formDni.controls['documento'].value
    this.empleado.contrasenia= this.pass.controls['contrasenia'].value
    
    this.empleado.rol=this.aRol

    this.subscripcion.add(
      this.empleadoervice.guardar(this.empleado).subscribe({
        next: ()=>{
          Swal.fire({
            title: 'Empleado Registrado Correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });

          this.limpiar();
          this.formDni.controls['documento'].setValue("");
          this.desactivarEmpleado();
        },
        error: ()=> {
          Swal.fire({
            title: 'Error al registrar el empleado',
            icon: 'error',
            confirmButtonText: "Ok",
          });
          this.limpiar();
          this.formDni.controls['documento'].setValue("");
          this.desactivarEmpleado();
        }
      })
      
    )

    
  }



}
