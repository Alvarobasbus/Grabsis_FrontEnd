import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InformeCaja } from 'src/app/models/informeCaja';
import { InformeCajaService } from 'src/app/services/informe-caja.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informe-caja',
  templateUrl: './informe-caja.component.html',
  styleUrls: ['./informe-caja.component.css']
})
export class InformeCajaComponent implements OnInit{

  formulario: FormGroup;
  formReporte: FormGroup;
  pipe = new DatePipe('en-US');
  hoy= new Date;
  fecha1= new Date();
  fecha2= new Date();
  fechaHoy:any;

  primer: any;
  ultimo: any;

  informe: InformeCaja;
  private subscripcion =new Subscription();

  

  public page: number;

  constructor(private formBuilder: FormBuilder,
    private informeCajaService: InformeCajaService){

  }
  ngOnInit(): void {
    this.formulario=this.formBuilder.group({
      fecha1: [, Validators.required],
      fecha2: [, Validators.required],
      mes: [, Validators.required]

    })

    this.formReporte=this.formBuilder.group({
      saldoTotal: [,],
      saldoCaja: [,],
      efectivo: [,],
      transferencia: [,],
      credito: [,],
      debito: [,],
      mercadoPago: [,],
      deposito: [,],
      egreso: [,],

    })

    this.formulario.controls['mes'].setValue("0")
   
    this.setFechaActual()

    var date = new Date();

    //var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);

    //var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    //console.log(this.pipe.transform(primerDia, 'YYYY-MM-dd'))
    //console.log(ultimoDia)
  }

  setImporte(){
    this.formReporte.controls['saldoTotal'].setValue(`$${this.informe.saldoTotal.toFixed(2)}`)
    this.formReporte.controls['saldoCaja'].setValue(`$${this.informe.saldoCaja.toFixed(2)}`)
    this.formReporte.controls['efectivo'].setValue(`$${this.informe.efectivo.toFixed(2)}`)
    this.formReporte.controls['debito'].setValue(`$${this.informe.debito.toFixed(2)}`)
    this.formReporte.controls['credito'].setValue(`$${this.informe.credito.toFixed(2)}`)
    this.formReporte.controls['transferencia'].setValue(`$${this.informe.transferencia.toFixed(2)}`)
    this.formReporte.controls['mercadoPago'].setValue(`$${this.informe.mercadoPago.toFixed(2)}`)
    this.formReporte.controls['deposito'].setValue(`$${this.informe.deposito.toFixed(2)}`)
    this.formReporte.controls['egreso'].setValue(`$${this.informe.egreso.toFixed(2)}`)

   
  }

  setFechaActual(){
    var date = new Date()
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var a= this.pipe.transform(primerDia, 'YYYY-MM-dd');
    this.fechaHoy= this.pipe.transform(this.hoy, 'YYYY-MM-dd');
     this.formulario.controls['fecha1'].setValue(a)
     this.formulario.controls['fecha2'].setValue(this.fechaHoy)

    this.fecha1= this.formulario.controls['fecha1'].value
    this.fecha2= this.formulario.controls['fecha2'].value

     this.subscripcion.add(
      this.informeCajaService.obtenerPorFechas(this.fecha1, this.fecha2).subscribe({
        next: respuesta =>{
      
          
            this.informe=respuesta;
          this.setImporte();
          
        } ,
        error: (e) => {
          Swal.fire({
            title: `${e }`,
            icon: 'error',
            confirmButtonText: "Ok",
          });

          console.log(e)
          return
        },
      })
    )

   }




  buscar(){
    this.fecha1= this.formulario.controls['fecha1'].value
    this.fecha2= this.formulario.controls['fecha2'].value

    this.subscripcion.add(
      this.informeCajaService.obtenerPorFechas(this.fecha1, this.fecha2).subscribe({
        next: respuesta =>{
    
            this.informe=respuesta;
            this.setImporte();
          
        } ,
        error: (e) => {
          Swal.fire({
            title: `${e }`,
            icon: 'error',
            confirmButtonText: "Ok",
          });

          console.log(e)
          return
        },
      })
    )

  
/*
    var date = new Date(this.formulario.controls['fecha1'].value);
    var date2 = new Date(this.formulario.controls['fecha2'].value);

    var mes = date.getMonth() +1;
    var dia = date.getDate() + 1;
    if(dia==32 || dia==31){
      dia=1
      mes+=1
    }
    var anio = date.getFullYear();

    ///date2
    var mes2 = date2.getMonth() + 1;
    var dia2 = date2.getDate() + 1;
    var anio2 = date2.getFullYear();

   */

 

  }

  porMes(){

    var date = new Date()
    var primerDia = new Date(date.getFullYear(), this.formulario.controls['mes'].value, 1);
    var ultimoDia = new Date(date.getFullYear(), primerDia.getMonth() + 1, 0);
    this.primer= this.pipe.transform(primerDia, 'YYYY-MM-dd');
    this.ultimo= this.pipe.transform(ultimoDia, 'YYYY-MM-dd');

    //2023-04-01


    this.subscripcion.add(
      this.informeCajaService.obtenerPorFechas(this.primer, this.ultimo).subscribe({
        next: respuesta =>{
          
            this.informe=respuesta;
            this.setImporte();
          
        } ,
        error: (e) => {
          Swal.fire({
            title: `${e }`,
            icon: 'error',
            confirmButtonText: "Ok",
          });

          console.log(e)
          return
        },
      })
    )

  }

  anual(){
    this.primer='2023-01-01';
    this.ultimo='2023-12-31';

    this.subscripcion.add(
      this.informeCajaService.obtenerPorFechas(this.primer, this.ultimo).subscribe({
        next: respuesta =>{
         
            this.informe=respuesta;
            this.setImporte();
          
        } ,
        error: (e) => {
          Swal.fire({
            title: `${e }`,
            icon: 'error',
            confirmButtonText: "Ok",
          });

          console.log(e)
          return
        },
      })
    )

  }

}
