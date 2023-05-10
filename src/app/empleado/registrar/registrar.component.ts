import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Rol } from 'src/app/models/rol';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit{

  empleado: Empleado;
  roles: Rol[];
  formulario: FormGroup;
  aRol: Rol;
  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder, private router: Router, private empleadoervice: EmpleadoService,
    private rolservice: RolService){

  }

  ngOnInit(): void {
    this.formulario=this.formBuilder.group({
      documento: [, Validators.required],
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      contrasenia: [, Validators.required],
      rol: [, Validators.required]

    })


    this.subscripcion.add(
      this.rolservice.obtenerTodas().subscribe({
        next: (respuesta) => this.roles=respuesta,
        error: () => {
          alert('Error al cargar los Roles');
        },
      })
    );

    this.subscripcion.add(
      this.formulario.controls['rol'].valueChanges.subscribe({
        next: (valor) =>{
          this.rolservice.obtenerPorId(valor).subscribe({
            next: (respuesta) => this.aRol = respuesta,
            error: () => alert('error al intentar guardar el rol seleccionada')
          })
        }
      })
    )

  }

  guardarEmpleado(){
    if(this.formulario.invalid){
      alert('Formulario invalido')
      return
    }
    this.empleado=this.formulario.value
    this.empleado.rol=this.aRol

    this.subscripcion.add(
      this.empleadoervice.guardar(this.empleado).subscribe({
        next: ()=>{
          alert('empleado registrado correctamente')
          console.log(this.empleado)
        },
        error: ()=> {
         alert('error al registrar el empleado')
        }
      })
      
    )

    
  }



}
