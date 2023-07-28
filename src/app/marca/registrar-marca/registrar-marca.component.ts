import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Marca } from 'src/app/models/marca';
import { AuthService } from 'src/app/services/auth.service';
import { MarcaService } from 'src/app/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-marca',
  templateUrl: './registrar-marca.component.html',
  styleUrls: ['./registrar-marca.component.css']
})
export class RegistrarMarcaComponent implements OnInit{

  formulario: FormGroup;
  marca: Marca;
  text:string;
  private subscripcion =new Subscription();
  isLogin: boolean=false;
currentID: number=0;
empleado: Empleado;

  
  
  
  constructor(private marcaService: MarcaService, private router: Router,
    private formBuilder: FormBuilder,
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
      descripcion: [, Validators.required]

    })
    
  }
  limpiar(){
    this.formulario.controls['descripcion'].setValue("");

  }

  agregarMarca(){
    if(this.formulario.invalid || this.formulario.controls['descripcion'].value == null || this.formulario.controls['descripcion'].value.trim().length ===0){
      alert('Debe ingresar correctamente la marca')
      return
    }

    this.marca=this.formulario.value
    this.marca.descripcion=this.formulario.controls['descripcion'].value.toUpperCase()



      
    this.subscripcion.add(
      this.marcaService.guardar(this.marca).subscribe({
        next: ()=>{
          Swal.fire({
            title: 'Marca Registrada Correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });
          this.limpiar()
        },
        error: ()=> {
         alert('error al registrar la marca')
        }
      })
      
    )
    

  }

}
