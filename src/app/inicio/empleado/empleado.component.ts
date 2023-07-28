import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { InformeCaja } from 'src/app/models/informeCaja';
import { InformeTurno } from 'src/app/models/informeTurno';
import { Insumo } from 'src/app/models/insumo';
import { Servicio } from 'src/app/models/servicio';
import { AuthService } from 'src/app/services/auth.service';
import { InformeCajaService } from 'src/app/services/informe-caja.service';
import { InformesService } from 'src/app/services/informes.service';
import { InsumoService } from 'src/app/services/insumo.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Chart, registerables} from 'node_modules/chart.js'
import Swal from 'sweetalert2';
import { InformeServicios } from 'src/app/models/informeServicios';
import { Router } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  pipe = new DatePipe('en-US');
  hoy= new Date;
  

  empleadoLog: Empleado;
  servicios: Servicio[];
  private subscripcion =new Subscription();

  informe: InformeCaja;
  fechaHoy:any;
  primer: any
  insumos: Insumo[];
  informeTurno: InformeTurno;
  labeldata:any[]=[];
  realdata:any[]=[];
  grafico: Chart;
  informeBaja: InformeServicios;

  labeldata2: any[]=[];
  realdata2: any[]=[];
  grafico2: any;

  isLogin: boolean=false;
currentID: number=0;
empleado: Empleado;

  constructor(private authService: AuthService,
    private servicioService: ServiciosService,
    private informeCajaService: InformeCajaService,
    private insumoService: InsumoService,
    private informesService: InformesService,
    private router: Router){

  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)
    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleado = currentEmpleado;
      this. empleadoLog=currentEmpleado;
      this.currentID= this.empleado.idEmpleado
    })

  if(this.isLogin==false){
      this.router.navigate(['']);
    }

    this.traerServicios()

    this.informeCaja()

    this.traerInsumosReponer()

    this.traerInformeTurno()

    this.informeServicios()

   



  }

  informeServicios(){
    var date = new Date()
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    this.primer= this.pipe.transform(primerDia, 'YYYY-MM-dd');
    this.fechaHoy= this.pipe.transform(this.hoy, 'YYYY-MM-dd');

     this.subscripcion.add(
      this.informesService.informeServicios(this.fechaHoy, this.fechaHoy).subscribe({
        next: respuesta =>{
      
          
            this.informeBaja=respuesta;
            console.log(this.informeBaja)
            this.labeldata2=[];
          this.realdata2=[];
          
          this.informeBaja=respuesta;
          this.labeldata2.push("AUTOPARTES")
          this.realdata2.push(this.informeBaja.autopartes)
          this.labeldata2.push("CRISTALES")
          this.realdata2.push(this.informeBaja.cristales)
          this.labeldata2.push("FORMULARIO 12")
          this.realdata2.push(this.informeBaja.formularios)

          //this.grafico.destroy()
    
        this.RenderChart2(this.labeldata2,this.realdata2);

          
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

  traerInformeTurno(){
    this.fechaHoy= this.pipe.transform(this.hoy, 'YYYY-MM-dd');

    this.subscripcion.add(
      this.informesService.informeTurnos(this.fechaHoy, this.fechaHoy).subscribe({
        next: respuesta =>{
  
            this.informeTurno=respuesta;
            this.informeTurno.cancelados
            this.labeldata.push("PENDIENTES")
            this.realdata.push(this.informeTurno.cantidad)
            this.labeldata.push("PAGADOS")
            this.realdata.push(this.informeTurno.pagado)
            this.labeldata.push("CANCELADOS")
            this.realdata.push(this.informeTurno.cancelados)
            this.RenderChart(this.labeldata,this.realdata);

        } ,
        error: (e) => {
          console.log(e.error.menssage)

        },
      })
    )
    
  }

  traerInsumosReponer(){
    this.subscripcion.add(
      this.insumoService.reponer().subscribe({
        next: (respuesta)=>{
          this.insumos=respuesta
        },
        error: ()=> {
         console.log('error al traer la lista de insumos')
        }
      })
      
    )
  }

  informeCaja(){
    var date = new Date()
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    this.primer= this.pipe.transform(primerDia, 'YYYY-MM-dd');
    this.fechaHoy= this.pipe.transform(this.hoy, 'YYYY-MM-dd');

    this.subscripcion.add(
      this.informeCajaService.obtenerPorFechas(this.primer, this.fechaHoy).subscribe({
        next: respuesta =>{
  
            this.informe=respuesta;

        } ,
        error: (e) => {
          console.log(e.error.menssage)

        },
      })
    )
  }

  traerServicios(){
    this.subscripcion.add(
      this.servicioService.obtenerTodos().subscribe({
        next: (respuesta)=>{
          this.servicios=respuesta
        },
        error: ()=> {
         console.log('error al traer la lista de servicios')
        }
      })
      
    )
  }


  modificarEmpleado(){
    this.router.navigate(['modificarempleado']);
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

 RenderChart2(labeldata2:any,maindate2:any){
    
  this.grafico2 = new Chart("doughnut", {
    type: 'doughnut',
    data: {
      labels: labeldata2,
      datasets: [{
        label: 'desactivar',
        data: maindate2,
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
