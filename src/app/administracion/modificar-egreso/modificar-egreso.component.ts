import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Egreso } from 'src/app/models/egreso';
import { EgresoService } from 'src/app/services/egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-egreso',
  templateUrl: './modificar-egreso.component.html',
  styleUrls: ['./modificar-egreso.component.css']
})
export class ModificarEgresoComponent implements OnInit {

  formulario: FormGroup;
  private subscripcion =new Subscription();
  egreso: Egreso;
  idEgreso: number;

  constructor(private formBuilder: FormBuilder, private router: Router, private egresoService: EgresoService,
    private activatedRoute: ActivatedRoute,){

  }
  ngOnInit(): void {

    this.formulario=this.formBuilder.group({
      fecha: [, Validators.required],
      numeroFactura: [, Validators.required],
      concepto: [, Validators.required],
      importe: [, Validators.required],
      tipoFactura: [, Validators.required]

    })

    const id = this.activatedRoute.snapshot.params['id'];
    this.idEgreso=id;

    this.subscripcion.add(
      this.egresoService.obtenerPorId(id).subscribe({
        next: (respuesta)=>{
          this.egreso=respuesta;
          this.formulario.patchValue(respuesta)      
        },
        error: ()=> {
         console.log('error al obtener el egreso a modificar')
        }
      })
      
    )


  }

  modificarEgreso(){

    if(this.formulario.invalid || this.formulario.controls['tipoFactura'].value==="value1"){
      Swal.fire({
        title: 'Debe ingresar correctamente todos los campos',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    this.egreso=this.formulario.value
    this.egreso.idEgreso=this.idEgreso;
    

    this.subscripcion.add(
      this.egresoService.guardar(this.egreso).subscribe({
        next: respuesta =>{

          Swal.fire({
            title: 'Egreso modificador correctamente',
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

  cancelar(){

  }



}
