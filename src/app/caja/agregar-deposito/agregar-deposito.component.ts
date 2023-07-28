import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Deposito } from 'src/app/models/deposito';
import { AuthService } from 'src/app/services/auth.service';
import { DepositoService } from 'src/app/services/deposito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-deposito',
  templateUrl: './agregar-deposito.component.html',
  styleUrls: ['./agregar-deposito.component.css']
})
export class AgregarDepositoComponent implements OnInit {
  formulario: FormGroup;
  deposito: Deposito;
  isLogin: boolean=false;
  private subscripcion =new Subscription();

  constructor(private depositoService: DepositoService, private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router){

  }
  ngOnInit(): void {

    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)
 

    if(this.isLogin==false){
        this.router.navigate(['']);
      }

    this.formulario=this.formBuilder.group({
      fecha: [, Validators.required],
      importe: [, Validators.required],
      banco: [, Validators.required],
      numeroTramite: [, Validators.required]

    })

  }

  agregarDeposito(){

    if(this.formulario.controls['importe'].value<=100){
      Swal.fire({
        title: 'el importe depositado debe ser mayor a $100 ',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }



    if(this.formulario.invalid){
      Swal.fire({
        title: 'Debe ingresar correctamente todos los campos',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }
    this.deposito=this.formulario.value
    this.deposito.banco.toUpperCase()
    

    this.subscripcion.add(
      this.depositoService.guardar(this.deposito).subscribe({
        next: respuesta =>{

          Swal.fire({
            title: 'Deposito guardado correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });

          this.cancelar();
          
        } ,
        error: (e) => {
          Swal.fire({
            title: 'error intentar guardar el deposito',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    )


  }

  cancelar(){

    this.formulario.controls['fecha'].setValue("")
    this.formulario.controls['numeroTramite'].setValue("")
    this.formulario.controls['banco'].setValue("")
    this.formulario.controls['importe'].setValue("")
  

    this.deposito=new Deposito;



  }

}
