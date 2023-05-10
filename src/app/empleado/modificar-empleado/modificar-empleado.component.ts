import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Rol } from 'src/app/models/rol';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-modificar-empleado',
  templateUrl: './modificar-empleado.component.html',
  styleUrls: ['./modificar-empleado.component.css']
})
export class ModificarEmpleadoComponent implements OnInit {
  empleado: Empleado;
  roles: Rol[];
  formulario: FormGroup;
  aRol: Rol;
  idEmpleado: number;
  deleted: any;
  
 
  private subscripcion =new Subscription();
  

  constructor(private formBuilder: FormBuilder, private router: Router, private empleadoervice: EmpleadoService,
    private activatedRoute: ActivatedRoute,
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

    const id = this.activatedRoute.snapshot.params['id'];
    this.idEmpleado=id;

    this.subscripcion.add(
      this.empleadoervice.obtenerPorId(id).subscribe({
        next: (respuesta)=>{
          console.log(respuesta)
          this.empleado=respuesta;
          this.formulario.patchValue(respuesta)
          this.formulario.controls['rol'].setValue(this.empleado.rol.id)
          this.deleted=respuesta.isDeleted
          
        },
        error: ()=> {
         alert('error al obtener el empleado')
        }
      })
      
    )

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


  guardarEmpleado(){
    if(this.formulario.invalid){
      alert('Formulario invalido')
      return
    }

    this.empleado.apellido=this.formulario.controls['apellido'].value
    this.empleado.nombre=this.formulario.controls['nombre'].value
    this.empleado.documento=this.formulario.controls['documento'].value
    this.empleado.contrasenia=this.formulario.controls['contrasenia'].value
    this.empleado.rol=this.aRol
    this.empleado.isDeleted=this.deleted;

    
  

    this.subscripcion.add(
      this.empleadoervice.modificar(this.empleado).subscribe({
        next: ()=>{
          alert('empleado modificado correctamente')
          this.router.navigate(['listaempleado']);
        },
        error: ()=> {
         alert('error al registrar el empleado')
        }
      })
      
    )

    
  }

}
