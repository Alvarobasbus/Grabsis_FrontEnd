import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Provincia } from 'src/app/models/provincia';
import { Usuario } from 'src/app/models/usuario';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {


  usuario: Usuario;
  usuarioRegistrado: boolean=false;
  formulario: FormGroup;
  formDni: FormGroup;
  provincias: Provincia[];
  pro: Provincia;
  private subscripcion =new Subscription();

constructor(private formBuilder: FormBuilder, private router: Router, private provinciaService: ProvinciaService,
  private usuarioService: UsuarioService){

}


  ngOnInit(): void {
    this.formulario=this.formBuilder.group({
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      email: [, Validators.required],
      telefono: [, Validators.required],
      domicilio: [, Validators.required],
      provincia: [, Validators.required]

    })

    this.formDni=this.formBuilder.group({
      documento: [, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    }
    )

    this.deshabilitarUsuario()



    this.subscripcion.add(
      this.provinciaService.obtenerTodas().subscribe({
        next: (respuesta) => this.provincias=respuesta,
        error: () => {
          
        },
      })
    );



    this.formDni.valueChanges.subscribe({
      next: (valor) =>{
        this.deshabilitarUsuario();
        this.borrar();
        
        if(this.formDni.valid){
          console.log(this.formDni.controls['documento'].value)

          this.subscripcion.add(
            this.usuarioService.obtenerPorId(this.formDni.controls['documento'].value).subscribe({
              next: (respuesta) =>{
                if(respuesta!=null){
                  this.usuario=respuesta
                  this.formulario.controls['nombre'].setValue(this.usuario.nombre);
                  this.formulario.controls['apellido'].setValue(this.usuario.apellido);
                  this.formulario.controls['telefono'].setValue(this.usuario.telefono);
                  this.formulario.controls['email'].setValue(this.usuario.email);
                  this.formulario.controls['provincia'].setValue(this.usuario.provincia?.idProvincia);
                  this.formulario.controls['domicilio'].setValue(this.usuario.domicilio);
                  this.pro=this.usuario.provincia
                  this.usuarioRegistrado=true;
                  this.habilitarUsuario();
                }
              }, 
              error: () => {
                this.habilitarUsuario();
                this.usuarioRegistrado=false;
              },
            })
          );
        }
      }
    })

  }

  borrar(){
    this.formulario.controls['nombre'].setValue("");
    this.formulario.controls['apellido'].setValue("");
    this.formulario.controls['telefono'].setValue("");
    this.formulario.controls['email'].setValue("");
    this.formulario.controls['provincia'].setValue("");
    this.formulario.controls['domicilio'].setValue("");
    this.usuarioRegistrado=false;
  }

  limpiar(){
    this.formulario.controls['nombre'].setValue("");
    this.formulario.controls['apellido'].setValue("");
    this.formulario.controls['telefono'].setValue("");
    this.formulario.controls['email'].setValue("");
    this.formulario.controls['provincia'].setValue("");
    this.formulario.controls['domicilio'].setValue("");
    this.formDni.controls['documento'].setValue("");
    this.usuarioRegistrado=false;

  }
  deshabilitarUsuario(){
    this.formulario.controls['nombre'].disable();
    this.formulario.controls['apellido'].disable();
    this.formulario.controls['telefono'].disable();
    this.formulario.controls['email'].disable();
    this.formulario.controls['provincia'].disable();
    this.formulario.controls['domicilio'].disable();

  }
  habilitarUsuario(){
    this.formulario.controls['nombre'].enable();
    this.formulario.controls['apellido'].enable();
    this.formulario.controls['telefono'].enable();
    this.formulario.controls['email'].enable();
    this.formulario.controls['provincia'].enable();
    this.formulario.controls['domicilio'].enable();

    this.subscripcion.add(
      this.formulario.controls['provincia'].valueChanges.subscribe({
        next: (valor) =>{
          this.provinciaService.obtenerPorId(valor).subscribe({
            next: (respuesta) => this.pro = respuesta,
            error: () => console.log('error al intentar guardar la provincia seleccionada')
          })
        }
      })
    )

  }


  guardarUsuario(){

    if(this.usuarioRegistrado==false){

      if(this.formulario.invalid){
        Swal.fire({
          title: 'Debe completar todos los campos',
          icon: 'error',
          confirmButtonText: "Ok",
        });
        return
      }
  
      this.usuario=this.formulario.value;
      this.usuario.documento= this.formDni.controls['documento'].value;
      this.usuario.nombre= this.formulario.controls['nombre'].value.toUpperCase();
      this.usuario.apellido= this.formulario.controls['apellido'].value.toUpperCase();
      this.usuario.email= this.formulario.controls['email'].value;
      this.usuario.telefono= this.formulario.controls['telefono'].value;
      this.usuario.domicilio= this.formulario.controls['domicilio'].value.toUpperCase();
      this.usuario.provincia=this.pro;
      this.usuario.isDeleted=false;

      Swal.fire({
        title: `¿Desea confirmar el registro del Usuario?`  ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) =>{
        if(result.isConfirmed){ 
  
          this.subscripcion.add(
            this.usuarioService.guardar(this.usuario).subscribe({
              next: (respuesta)=>{
                this.usuario=respuesta

                Swal.fire({
                  title: `Usuario ${this.usuario.apellido + " " + this.usuario.nombre} registrado con exito!`,
                  icon: 'success',
                  confirmButtonText: "Ok",
                });

                this.limpiar()
                this.deshabilitarUsuario()
               
              },
              error: ()=> {
                console.log("Error al registrar el usuario")
              }
            })    
          )
      
        }
      })









    }

    if(this.usuarioRegistrado==true){

      this.usuario.documento= this.formDni.controls['documento'].value;
      this.usuario.nombre= this.formulario.controls['nombre'].value.toUpperCase();
      this.usuario.apellido= this.formulario.controls['apellido'].value.toUpperCase();
      this.usuario.email= this.formulario.controls['email'].value;
      this.usuario.telefono= this.formulario.controls['telefono'].value;
      this.usuario.domicilio= this.formulario.controls['domicilio'].value.toUpperCase();
      this.usuario.provincia=this.pro;
      this.usuario.isDeleted=false;

      Swal.fire({
        title: `¿Desea modificar los datos del Usuario?`  ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) =>{
        if(result.isConfirmed){ 
  
          this.subscripcion.add(
            this.usuarioService.guardar(this.usuario).subscribe({
              next: (respuesta)=>{
                this.usuario=respuesta

                Swal.fire({
                  title: `Usuario ${this.usuario.apellido + " " + this.usuario.nombre} modificado con exito!`,
                  icon: 'success',
                  confirmButtonText: "Ok",
                });

                this.limpiar()
                this.deshabilitarUsuario()
               
              },
              error: ()=> {
                console.log("Error al registrar el usuario")
              }
            })    
          )
      
        }
      })
  
      
    }




    
  }



 

 salirUsuario(){
  this.router.navigate(['']);
 }

}
