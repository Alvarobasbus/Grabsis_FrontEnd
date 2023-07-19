import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Egreso } from 'src/app/models/egreso';
import { EgresoService } from 'src/app/services/egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-egreso',
  templateUrl: './agregar-egreso.component.html',
  styleUrls: ['./agregar-egreso.component.css']
})
export class AgregarEgresoComponent implements OnInit {


  formulario: FormGroup;
  egreso: Egreso;

  private subscripcion =new Subscription();

  constructor(private egresoService: EgresoService, private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.formulario=this.formBuilder.group({
      fecha: [, Validators.required],
      numeroFactura: [, Validators.required],
      concepto: [, Validators.required],
      importe: [, Validators.required],
      tipoFactura: [, Validators.required]

    })

    this.formulario.controls['tipoFactura'].setValue("value1")
  }

  cancelar(){
    this.formulario.controls['tipoFactura'].setValue("value1")
    this.formulario.controls['fecha'].setValue("")
    this.formulario.controls['numeroFactura'].setValue("")
    this.formulario.controls['concepto'].setValue("")
    this.formulario.controls['importe'].setValue("")
  

    this.egreso=new Egreso;

  }

  agregaregreso(){

    if(this.formulario.invalid || this.formulario.controls['tipoFactura'].value==="value1"){
      Swal.fire({
        title: 'Debe ingresar correctamente todos los campos',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }
    this.egreso=this.formulario.value
    this.egreso.concepto.toUpperCase();
    

    this.subscripcion.add(
      this.egresoService.guardar(this.egreso).subscribe({
        next: respuesta =>{

          Swal.fire({
            title: 'Egreso guardado correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });

          this.cancelar();
          
        } ,
        error: (e) => {
          Swal.fire({
            title: 'error intentar guardar el egreso',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    )
    
  }

}
