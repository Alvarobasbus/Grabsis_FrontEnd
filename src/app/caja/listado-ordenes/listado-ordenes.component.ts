import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Detalle } from 'src/app/models/detalle';
import { Empleado } from 'src/app/models/empleado';
import { Orden } from 'src/app/models/orden';
import { Servicio } from 'src/app/models/servicio';
import { AuthService } from 'src/app/services/auth.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { OrdenService } from 'src/app/services/orden.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listado-ordenes',
  templateUrl: './listado-ordenes.component.html',
  styleUrls: ['./listado-ordenes.component.css']
})
export class ListadoOrdenesComponent implements OnInit {

  formulario: FormGroup;

  modi: boolean;

  empleadoLog: Empleado;
  filterProduct: string = '';

  hoy= new Date;
  pipe = new DatePipe('en-US');
  fechaHoy:any;
  ordenes: Orden[];
  data: any[];
  fecha1: any;
  fecha2: any;
  public page: number;
  resul: boolean;
  busqueda: boolean;
  orden: Orden;
  idOrden: number;
  total: any;
  listaServicios: Servicio[]=[];
  listaAuxDetalle: Detalle[]=[];
  auxDetalle: Detalle

  listaDetalle: Detalle[]=[];

  faltaDetalle: boolean;

  t: number;

  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder,
    private ordenService: OrdenService,
    private detalleService: DetalleService,
    private authService: AuthService,
    private servicioService: ServiciosService){

  }
  ngOnInit(): void {
    this.traerServiciosYDetalles()
    this.faltaDetalle=false;
    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleadoLog = currentEmpleado;
    })


    this.modi=false;
    this.busqueda=true;
    this.resul=false;
    this.formulario=this.formBuilder.group({
      fecha1: [, Validators.required],
      fecha2: [, Validators.required]

    })

    this.setFechaActual()
   
  }

  volver(){
    this.orden=new Orden;
    this.modi=false;
    this.buscar()
    this.busqueda=true;
    this.resul=true

    this.listaDetalle=[];


  }
  setFechaActual(){
    // this.fechaHoy= this.pipe.transform(this.hoy, 'dd/MM/YYYY');
    this.fechaHoy= this.pipe.transform(this.hoy, 'YYYY-MM-dd');
     this.formulario.controls['fecha1'].setValue(this.fechaHoy)
     this.formulario.controls['fecha2'].setValue(this.fechaHoy)

     this.buscar()
   }

   

  modificar(lst: Orden){
    this.busqueda=false;
    this.resul=false;
    this.idOrden=lst.idOrden
    this.modi=true;
    this.orden=lst;

   this.setServicios(lst)

  }

  traerServiciosYDetalles(){

    this.subscripcion.add(
      this.servicioService.obtenerTodos().subscribe({
        next: respuesta =>{
          for (let index = 0; index < respuesta.length; index++) {
            const element = respuesta[index];
            this.auxDetalle=new Detalle;
            this.auxDetalle.cantidad=1
            this.auxDetalle.precio= element.precio
            this.auxDetalle.servicio=element
            this.listaAuxDetalle.push(this.auxDetalle);
          }
          
          if(respuesta==null){
            console.log("error al traer los servicios y detalle")
          }
        } ,
        error: () => {
          console.log("error al traer los servicios y detalle")
        },
      })
    )

  }

  agregarDetalle(det: Detalle){

    Swal.fire({
      title: `¿Quiere agregar el servicio N°:  ${det.servicio.descripcion}?`  ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){ 

        this.orden.detalle.push(det)
        this.orden.total+=det.precio

        
    this.subscripcion.add(
      this.ordenService.guardar(this.orden).subscribe({
        next: (respuesta) =>{
          console.log('Orden actualizada con exito')
          this.listaDetalle=[];
          this.actualizarOdenDet();
          //this.setServicios(this.orden)
        },
        error: () => {
          console.log('no fue posible borrar la Orden')

        },
      })
    );

  }
  }
  )



  }

  setServicios(lst: Orden){
    if(lst.detalle.length<3){


      for (let i = 0; i < this.listaAuxDetalle.length; i++) {
        const element = this.listaAuxDetalle[i];
        this.t=0;

        for (let x = 0; x < lst.detalle.length; x++) {
          const element2 = lst.detalle[x];


          if(element.servicio.descripcion===element2.servicio.descripcion){
            this.t=1
          }

        }

        if(this.t==0){
          this.listaDetalle.push(this.listaAuxDetalle[i])
        }
        
      }
  
      this.faltaDetalle=true;

    }else{
      this.faltaDetalle=false;

    }
    
    
  }


  eliminar(orden: Orden){

    if(this.empleadoLog.rol.descripcion!="Gerente"){
      Swal.fire({
        title: 'Permiso Denegado!',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }else{

      Swal.fire({
        title: `¿Desea Eliminar la Orden N°:  ${orden.idOrden}?`  ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) =>{
        if(result.isConfirmed){ 
  
          
      this.subscripcion.add(
        this.ordenService.borrado(orden).subscribe({
          next: (respuesta) =>{
            console.log('Orden borrada con exito')
            this.buscar()
          },
          error: () => {
            console.log('no fue posible borrar la Orden')
  
          },
        })
      );


      
      }
    }
      )
  }


    
  }


  eliminarDetalle(det: Detalle){
    if(det.servicio.descripcion==="FORMULARIO 12" && this.orden.turno.formulario!=null){
      Swal.fire({
        title: 'La orden cuenta con un formulario 12 asignado al vehiculo',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    if(det.servicio.descripcion==="GRABADO DE AUTOPARTES" && this.orden.turno.vehiculo.autopartes==true){
      Swal.fire({
        title: 'No es posible eliminar este item ya que, al vehiculo se grabado las autopartes',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }
    
    if(det.servicio.descripcion==="GRABADO DE CRISTALES" && this.orden.turno.vehiculo.cristales==true){
      Swal.fire({
        title: 'No es posible eliminar este item ya que, al vehiculo se grabado los cristales',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    if(det.precio>=this.orden.total){
      Swal.fire({
        title: 'No es posible dejar la orden $0.00',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }


    

    Swal.fire({
      title: `¿Desea Eliminar el detalle:  ${det.servicio.descripcion}?`  ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){ 
        this.orden.total-=det.precio
        
    this.subscripcion.add(
      this.detalleService.eliminar(det.idDetalle).subscribe({
        next: (respuesta) =>{
          this.actualizarOdenDet()
          console.log('Detalle borrado con exito')
          
        },
        error: () => {
          console.log('no fue posible borrar el detalle')

        },
      })
    );



    
      }
    })




  }

  actualizarOdenDet(){
    this.subscripcion.add(
      this.ordenService.actualizar(this.orden).subscribe({
        next: (respuesta) =>{
          console.log('orden actualizada con exito')
          this.orden=respuesta
          this.listaDetalle=[];
          this.setServicios(this.orden)
          
        },
        error: () => {
          console.log('no fue posible actualizar la orden')
     
        },
      })
    );

  }

  buscar(){

    if(this.formulario.invalid){
      Swal.fire({
        title: 'Debe ingresar correctamente ambas fechas',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    if(this.formulario.controls['fecha2'].value>this.fechaHoy){
      Swal.fire({
        title: 'La fecha maxima de busqueda no puede ser mayor a la fecha actual',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
      
    }

    if(this.formulario.controls['fecha2'].value<this.formulario.controls['fecha1'].value){
      Swal.fire({
        title: 'La fecha ingresada en el campo desde no puede ser mayor a la fecha del campo hasta',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    this.fecha1=this.formulario.controls['fecha1'].value;
    this.fecha2=this.formulario.controls['fecha2'].value


    this.subscripcion.add(
      this.ordenService.obtenerPorFechas(this.fecha1,this.fecha2).subscribe({
        next: (respuesta) =>{
          this.ordenes=respuesta;


          if(respuesta!=null){
            this.resul=true;
          }
          
        },
        error: () => {
          this.resul=false;
          Swal.fire({
            title: 'Erro al obtener el listado',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    );

  }


  


 

  
  

}
