import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables} from 'node_modules/chart.js'
import { Subscription } from 'rxjs';
import { InformeInsumos } from 'src/app/models/informeInsumos';
import { InformeServicios } from 'src/app/models/informeServicios';
import { InformesService } from 'src/app/services/informes.service';
import Swal from 'sweetalert2';
Chart.register(...registerables);

@Component({
  selector: 'app-informe-servicios',
  templateUrl: './informe-servicios.component.html',
  styleUrls: ['./informe-servicios.component.css']
})
export class InformeServiciosComponent implements OnInit {

  formulario: FormGroup;
  formReporte: FormGroup;
  pipe = new DatePipe('en-US');
  hoy= new Date;
  fecha1= new Date();
  fecha2= new Date();
  fechaHoy:any;

  grafico: any;


  primer: any;
  ultimo: any;

  informeBaja: InformeServicios;

  labeldata:any[]=[];
  realdata:any[]=[];



  private subscripcion =new Subscription();

  

  public page: number;

  constructor(private formBuilder: FormBuilder,
    private informeService: InformesService
    ){

  }
  ngOnInit(): void {
    this.formulario=this.formBuilder.group({
      fecha1: [, Validators.required],
      fecha2: [, Validators.required],
      mes: [, Validators.required]

    })

    this.formulario.controls['mes'].setValue("0")
   
    this.setFechaActual()

    var date = new Date();


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
      this.informeService.informeServicios(this.fecha1, this.fecha2).subscribe({
        next: respuesta =>{
      
          
            this.informeBaja=respuesta;
            console.log(this.informeBaja)
            this.labeldata=[];
          this.realdata=[];
          
          this.informeBaja=respuesta;
          this.labeldata.push("AUTOPARTES")
          this.realdata.push(this.informeBaja.autopartes)
          this.labeldata.push("CRISTALES")
          this.realdata.push(this.informeBaja.cristales)
          this.labeldata.push("FORMULARIO 12")
          this.realdata.push(this.informeBaja.formularios)

          //this.grafico.destroy()
    
        this.RenderChart(this.labeldata,this.realdata);

          
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
      this.informeService.informeServicios(this.fecha1, this.fecha2).subscribe({
        next: respuesta =>{
    
          this.informeBaja=respuesta;
          this.labeldata=[];
          this.realdata=[];
          
          this.informeBaja=respuesta;
          this.labeldata.push("AUTOPARTES")
          this.realdata.push(this.informeBaja.autopartes)
          this.labeldata.push("CRISTALES")
          this.realdata.push(this.informeBaja.cristales)
          this.labeldata.push("FORMULARIO 12")
          this.realdata.push(this.informeBaja.formularios)

          this.grafico.destroy()
    
        this.RenderChart(this.labeldata,this.realdata);
          
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

  porMes(){

    var date = new Date()
    var primerDia = new Date(date.getFullYear(), this.formulario.controls['mes'].value, 1);
    var ultimoDia = new Date(date.getFullYear(), primerDia.getMonth() + 1, 0);
    this.primer= this.pipe.transform(primerDia, 'YYYY-MM-dd');
    this.ultimo= this.pipe.transform(ultimoDia, 'YYYY-MM-dd');

    //2023-04-01


    this.subscripcion.add(
      this.informeService.informeServicios(this.primer, this.ultimo).subscribe({
        next: respuesta =>{

          this.labeldata=[];
          this.realdata=[];
          
          this.informeBaja=respuesta;
          this.labeldata.push("AUTOPARTES")
          this.realdata.push(this.informeBaja.autopartes)
          this.labeldata.push("CRISTALES")
          this.realdata.push(this.informeBaja.cristales)
          this.labeldata.push("FORMULARIO 12")
          this.realdata.push(this.informeBaja.formularios)

          this.grafico.destroy()
    
        this.RenderChart(this.labeldata,this.realdata);
          
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
      this.informeService.informeServicios(this.primer, this.ultimo).subscribe({
        next: respuesta =>{
         
          this.informeBaja=respuesta;
          this.labeldata=[];
          this.realdata=[];
          
          this.informeBaja=respuesta;
          this.labeldata.push("AUTOPARTES")
          this.realdata.push(this.informeBaja.autopartes)
          this.labeldata.push("CRISTALES")
          this.realdata.push(this.informeBaja.cristales)
          this.labeldata.push("FORMULARIO 12")
          this.realdata.push(this.informeBaja.formularios)

          this.grafico.destroy()
    
        this.RenderChart(this.labeldata,this.realdata);
        
          
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


  RenderChart(labeldata:any,maindate:any){
    
   this.grafico = new Chart("ctx", {
     type: 'doughnut',
     data: {
       labels: labeldata,
       datasets: [{
         label: 'desactivar',
         data: maindate,
         backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
       ],
       hoverOffset: 4
       }]
     }
   })
 }

}
