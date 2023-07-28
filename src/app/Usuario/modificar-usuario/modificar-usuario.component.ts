import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Provincia } from 'src/app/models/provincia';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {

  usuario: Usuario;
  formulario: FormGroup;
  formulario2: FormGroup;
  dni: number;
  provincias: Provincia[];
  modificar: boolean;
  pro: Provincia;
  deteled: boolean;
  isLogin: boolean=false;
currentID: number=0;
empleado: Empleado;

  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder, private router: Router, private provinciaService: ProvinciaService,
    private usuarioService: UsuarioService,
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

    this.modificar=false;

    this.formulario=this.formBuilder.group({
      dni: [, Validators.required]
    })


    this.formulario2=this.formBuilder.group({
      documento: [, Validators.required],
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      email: [, Validators.required],
      telefono: [, Validators.required],
      domicilio: [, Validators.required],
      provincia: [, Validators.required]

    })



    this.subscripcion.add(
      this.provinciaService.obtenerTodas().subscribe({
        next: (respuesta) => this.provincias=respuesta,
        error: () => {
          alert('Error al cargar las provincias');
        },
      })
    )

    this.subscripcion.add(
      this.formulario2.controls['provincia'].valueChanges.subscribe({
        next: (valor) =>{
          this.provinciaService.obtenerPorId(valor).subscribe({
            next: (respuesta) => this.pro = respuesta,
          })
        }
      })
    )
    
  }


  buscar(){
    if(this.dni===null){
      alert('debe ingresar correctamente el numero de documento')
    }else{
      this.dni=this.formulario.controls['dni'].value;
    
  

      this.subscripcion.add(
        this.usuarioService.obtenerPorId(this.dni).subscribe({
          next: (respuesta) => {
            this.usuario=respuesta
            this.modificar=true;
            this.formulario2.patchValue(this.usuario)
            this.formulario2.controls['provincia'].setValue(this.usuario.provincia?.idProvincia)
            this.deteled=respuesta.isDeleted;
            if(respuesta.isDeleted==true){
              this.formulario2.disable();
            }else{
              this.formulario2.enable()
            }


          } ,
          error: () => {
            alert('Usuario inexistente');
            this.formulario.controls['dni'].setValue(null);
          },
        })
      );

    }

  }


  guardarCambios(){
    if(this.formulario2.invalid){
      alert('Formulario invalido')
      return
    }

    this.usuario=this.formulario2.value;
    this.usuario.provincia=this.pro; 
    this.usuario.isDeleted=this.deteled;


    this.subscripcion.add(
      this.usuarioService.guardar(this.usuario).subscribe({
        next: ()=>{
          alert('Usuario modificado correctamente')
          this.modificar=false
          this.formulario.controls['dni'].setValue("");

        },
        error: ()=> {
         alert('error al modificar el usuario')
        }
      })
      
    )
  }

  eliminar(){
    this.subscripcion.add(
      this.usuarioService.delete(this.usuario.documento).subscribe({
        next: (respuesta) =>{
          alert('Usuario eliminado correctamente')
          this.buscar()
        },
        error: () => {
          alert('Error al borrar el usuario');
        },
      })
    );
  

  }

  activar(){
    this.subscripcion.add(
      this.usuarioService.activar(this.usuario.documento).subscribe({
        next: (respuesta) =>{
          alert('usuario activado correctamente')
          this.buscar()
        },
        error: () => {
          alert('Error al activar el usuario');
        },
      })
    );
  }

}
