import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  formulario: FormGroup;
  empleado: Empleado;

  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder, private router: Router, private empleadoService: EmpleadoService,
    private helperservice: HelperService){

  }

  ngOnInit(): void {
    this.formulario=this.formBuilder.group({
      documento: [, Validators.required],
      contrasenia: [, Validators.required]
    })
    
  }

  login(){

    this.empleado=this.formulario.value;

    this.subscripcion.add(
      this.empleadoService.postLogin(this.empleado).subscribe({
        next: (resultado)=>{
          this.empleado=resultado;
          alert('Logeado correctamente')
          this.empleado.contrasenia="null";
          this.helperservice.setCurrentEmpleado(this.empleado)
          this.helperservice.setCurrentId(this.empleado.idEmpleado);
          this.router.navigate(['empleado']);
        },
        error: (e)=> {
         alert('error los datos de login')
        }
      })
      
    )

      
  }
}
