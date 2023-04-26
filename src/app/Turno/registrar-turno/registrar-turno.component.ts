import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Provincia } from 'src/app/models/provincia';
import { Usuario } from 'src/app/models/usuario';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-turno',
  templateUrl: './registrar-turno.component.html',
  styleUrls: ['./registrar-turno.component.css']
})
export class RegistrarTurnoComponent implements OnInit {

  usuario: Usuario;
  formulario: FormGroup;
  provincias: Provincia[];
  pro: Provincia;
  user: boolean;
  vehiculo: boolean;
  turno: boolean;

  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder, private router: Router, private provinciaService: ProvinciaService,
    private usuarioService: UsuarioService){
  

  }
  

  ngOnInit(): void {
    this.user=true;
    this.vehiculo=false;
    this.turno=false;
    this.formulario=this.formBuilder.group({
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
    );


    this.subscripcion.add(
      this.formulario.controls['provincia'].valueChanges.subscribe({
        next: (valor) =>{
          this.provinciaService.obtenerPorId(valor).subscribe({
            next: (respuesta) => this.pro = respuesta,
            error: () => alert('error al intentar guardar la provincia seleccionada')
          })
        }
      })
    )
    
  }


  guardarUsuario(){
    if(this.formulario.invalid){
      alert('Formulario invalido')
      return
    }

    this.usuario=this.formulario.value;
    this.usuario.documento= this.formulario.controls['documento'].value;
    this.usuario.nombre= this.formulario.controls['nombre'].value;
    this.usuario.apellido= this.formulario.controls['apellido'].value;
    this.usuario.email= this.formulario.controls['email'].value;
    this.usuario.telefono= this.formulario.controls['telefono'].value;
    this.usuario.domicilio= this.formulario.controls['domicilio'].value;
    this.usuario.provincia=this.pro;


   
  
    

    this.subscripcion.add(
      this.usuarioService.guardar(this.usuario).subscribe({
        next: ()=>{
          alert('Usuario registrado correctamente')
          this.user=false;
          this.vehiculo=true;
          console.log(this.usuario)
        },
        error: ()=> {
         alert('error al registrar el usuario')
        }
      })
      
    )
  }

  


}
