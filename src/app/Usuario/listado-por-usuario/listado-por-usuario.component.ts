import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-por-usuario',
  templateUrl: './listado-por-usuario.component.html',
  styleUrls: ['./listado-por-usuario.component.css']
})
export class ListadoPorUsuarioComponent implements OnInit {

  formulario: FormGroup

  filter: string = '';
  usuario: Usuario;
  turnos: Turno[]=[];
  busqueda: boolean=true;
  user: boolean=false;
  general: boolean=false;

  public page: number;


  private subscripcion =new Subscription();

  constructor(private turnoService: TurnoService,
    private usuarioService: UsuarioService,
    private  formBuilder: FormBuilder,
    private authService: AuthService ){

  }
  ngOnInit(): void {

    this.formulario=this.formBuilder.group({
      documento: [, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]

    })
    
  }

  buscar(){
    this.usuario=new Usuario;
    this.turnos=[];
    if(this.formulario.invalid){
      Swal.fire({
        title: 'Debe ingresar correctamente el documento, longitud 8 caracteres y sin puntos',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }


    if(this.formulario.valid){

      this.subscripcion.add(
        this.usuarioService.obtenerPorId(this.formulario.controls['documento'].value).subscribe({
          next: (respuesta) =>{
            if(respuesta!=null){
              this.usuario=respuesta
              this.general=true;

              this.subscripcion.add(
                this.turnoService.obtenerPorUsuario(this.formulario.controls['documento'].value).subscribe({
                  next: (respuesta) =>{
                    if(respuesta!=null){
                      this.turnos=respuesta
                    }
                  
                  }, 
                  error: () => {
                    Swal.fire({
                      title: 'Usuario no tiene turnos registrados',
                      icon: 'error',
                      confirmButtonText: "Ok",
                    });
                  },
                })

              )



            }
          }, 
          error: () => {
            Swal.fire({
              title: 'Usuario no encontrado',
              icon: 'error',
              confirmButtonText: "Ok",
            });
            this.general=false;
          },
        })
      );



     
    }



  }

}
