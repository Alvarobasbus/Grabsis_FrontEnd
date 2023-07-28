import { DatePipe } from '@angular/common';
import { Component, OnInit,  Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InformeCaja } from 'src/app/models/informeCaja';
import { PrecioPipe } from 'src/app/pipes/precio.pipe';
import { PreciocomaPipe } from 'src/app/pipes/preciocoma.pipe';
import { InformeCajaService } from 'src/app/services/informe-caja.service';
import { formatNumber } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  isLogin: boolean=false;
  primer: any;
  ultimo: any;

  informe: InformeCaja;
  private subscripcion =new Subscription();

  

  public page: number;
  formattedNumber: string;

  constructor(private formBuilder: FormBuilder,
    private informeCajaService: InformeCajaService,
    @Inject(LOCALE_ID) private locale: string,
    private authService: AuthService,
    private router: Router){

  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)
 

    if(this.isLogin==false){
        this.router.navigate(['']);
      }
    
    
    const numberToFormat = 1234567.89;
    this.formattedNumber = formatNumber(numberToFormat, 'en-US', '1.2-2');



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
    let filterpipe= new PrecioPipe()
   
    this.formReporte.controls['saldoTotal'].setValue( filterpipe.transform(this.informe.saldoTotal))
    this.formReporte.controls['saldoCaja'].setValue(filterpipe.transform(this.informe.saldoCaja))
    this.formReporte.controls['efectivo'].setValue(filterpipe.transform(this.informe.efectivo))
    this.formReporte.controls['debito'].setValue(filterpipe.transform(this.informe.debito))
    this.formReporte.controls['credito'].setValue(filterpipe.transform(this.informe.credito))
    this.formReporte.controls['transferencia'].setValue(filterpipe.transform(this.informe.transferencia))
    this.formReporte.controls['mercadoPago'].setValue(filterpipe.transform(this.informe.mercadoPago))
    this.formReporte.controls['deposito'].setValue( filterpipe.transform(this.informe.deposito))
    this.formReporte.controls['egreso'].setValue(filterpipe.transform(this.informe.egreso))

    /*
    this.formReporte.controls['saldoTotal'].setValue(`$${this.informe.saldoTotal.toFixed(2)}`)
   this.formReporte.controls['saldoCaja'].setValue(`$${this.informe.saldoCaja.toFixed(2)}`)
    this.formReporte.controls['efectivo'].setValue(`$${this.informe.efectivo.toFixed(2)}`)
    this.formReporte.controls['debito'].setValue(`$${this.informe.debito.toFixed(2)}`)
    this.formReporte.controls['credito'].setValue(`$${this.informe.credito.toFixed(2)}`)
    this.formReporte.controls['transferencia'].setValue(`$${this.informe.transferencia.toFixed(2)}`)
    this.formReporte.controls['mercadoPago'].setValue(`$${this.informe.mercadoPago.toFixed(2)}`)
    this.formReporte.controls['deposito'].setValue(`$${this.informe.deposito.toFixed(2)}`)
    this.formReporte.controls['egreso'].setValue(`$${this.informe.egreso.toFixed(2)}`)

   */
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
          let pipett= new PreciocomaPipe();

          let formatt=new Number();
      
          
            this.informe=respuesta;
            this.informe.egreso= this.informe.egreso.toString().replace(/\./g,',');
            this.informe.credito= this.informe.credito.toString().replace(/\./g,',');
            this.informe.mercadoPago= this.informe.mercadoPago.toString().replace(/\./g,',');
            this.informe.saldoCaja= this.informe.saldoCaja.toString().replace(/\./g,',');
            this.informe.saldoTotal= this.informe.saldoTotal.toString().replace(/\./g,',');
            this.informe.transferencia= this.informe.transferencia.toString().replace(/\./g,',');
            this.informe.debito= this.informe.debito.toString().replace(/\./g,',');
            this.informe.deposito= this.informe.deposito.toString().replace(/\./g,',');

            
      
            console.log(this.informe)
           // console.log(pipett.transform(this.informe.egreso))
         //   console.log(this.informe.egreso.toString().replace(/\./g,','))
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
