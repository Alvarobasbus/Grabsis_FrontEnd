import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { Chart, registerables} from 'node_modules/chart.js'
import { InformeInsumos } from 'src/app/models/informeInsumos';
import { InformeServicios } from 'src/app/models/informeServicios';
import { InformesService } from 'src/app/services/informes.service';
import Swal from 'sweetalert2';
Chart.register(...registerables);

@Component({
  selector: 'app-informe-insumos',
  templateUrl: './informe-insumos.component.html',
  styleUrls: ['./informe-insumos.component.css']
})
export class InformeInsumosComponent implements OnInit{

  formulario: FormGroup;
  formReporte: FormGroup;
  pipe = new DatePipe('en-US');
  hoy= new Date;
  fecha1= new Date();
  fecha2= new Date();
  fechaHoy:any;

  grafico: Chart;


  primer: any;
  ultimo: any;

  informeBaja: InformeInsumos[]=[];
  informeAlta: InformeInsumos[]=[];

  chartdata: any;

  labeldata:any[]=[];
  realdata:any[]=[];
  colordata:any[]=[];

  

  private subscripcion =new Subscription();

  descripcion: String[]=[];
  cant: number[]=[];

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
    //this.RenderChart(this.labeldata,this.realdata);

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
      this.informeService.insumosBaja(this.fecha1, this.fecha2).subscribe({
        next: respuesta =>{

            this.informeBaja=respuesta 
        

          for (let index = 0; index < this.informeBaja.length; index++) {
            const element = this.informeBaja[index];
            this.labeldata.push(element.descripcion)
            this.realdata.push(element.cantidad)
            
          }
          console.log(this.labeldata)
          console.log(this.realdata)
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
      this.informeService.insumosBaja(this.fecha1, this.fecha2).subscribe({
        next: respuesta =>{
    
          this.informeBaja=respuesta;
          this.realdata=[];
          this.labeldata=[];
          for (let index = 0; index < this.informeBaja.length; index++) {
            const element = this.informeBaja[index];
            this.labeldata.push(element.descripcion)
            this.realdata.push(element.cantidad)
            
          }
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
      this.informeService.insumosBaja(this.primer, this.ultimo).subscribe({
        next: respuesta =>{
          
          this.informeBaja=respuesta;
          this.realdata=[];
          this.labeldata=[];
          for (let index = 0; index < this.informeBaja.length; index++) {
            const element = this.informeBaja[index];
            this.labeldata.push(element.descripcion)
            this.realdata.push(element.cantidad)
            
          }
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
      this.informeService.insumosBaja(this.primer, this.ultimo).subscribe({
        next: respuesta =>{
         
          this.informeBaja=respuesta;
          this.realdata=[];
          this.labeldata=[];
          console.log(this.informeBaja)
          for (let index = 0; index < this.informeBaja.length; index++) {
            const element = this.informeBaja[index];
            this.labeldata.push(element.descripcion)
            this.realdata.push(element.cantidad)
            
          }
    
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
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'desactivar',
          data: maindate,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
 

}
