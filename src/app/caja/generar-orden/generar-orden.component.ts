import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Detalle } from 'src/app/models/detalle';
import { Empleado } from 'src/app/models/empleado';
import { Marca } from 'src/app/models/marca';
import { MetodoPago } from 'src/app/models/metodoPago';
import { Orden } from 'src/app/models/orden';
import { Provincia } from 'src/app/models/provincia';
import { Servicio } from 'src/app/models/servicio';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AuthService } from 'src/app/services/auth.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { MarcaService } from 'src/app/services/marca.service';
import { MetodopagoService } from 'src/app/services/metodopago.service';
import { OrdenService } from 'src/app/services/orden.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generar-orden',
  templateUrl: './generar-orden.component.html',
  styleUrls: ['./generar-orden.component.css']
})
export class GenerarOrdenComponent implements OnInit {

  pagoExito:boolean;
  formVehiculo: FormGroup;
  marcas: Marca[];
  vehiculo: Vehiculo;
  mar: Marca;
  pro: Provincia;
  provin:Provincia;
  public page: number;
  formulario: FormGroup;
  formulario2: FormGroup;
  turnos: Turno[];
  currentDate: any;
  private subscripcion =new Subscription();
  fecha: any;
  porPagar: boolean;
  listaServicios: Servicio[];
  listaDetalle: Detalle[]=[];
  auxDetalle: Detalle;
  Detalles: Detalle[]=[];
  precioTotal: number=0;
  orden:Orden;
  empl: Empleado;
  metodos: MetodoPago[];
  metodo: MetodoPago;
  formularioUsuario: FormGroup;
  provincias: Provincia[];
  usuario: Usuario;

  ordenGenerada: Orden;

  filter: string = '';

  mp:boolean;


  turnoPorPagar: Turno;

  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router,
    private turnoservice: TurnoService,
    private DetalleService: DetalleService,
    private servicioService: ServiciosService,
    private ordenService: OrdenService,
    private authService: AuthService,
    private metodopagoService: MetodopagoService,
    private provinciaService: ProvinciaService,
    private usuarioService: UsuarioService,
    private marcaService: MarcaService,
    private vehiculoService: VehiculoService){

    
     
  }

  
  ngOnInit(): void {
    this.mp=false;
    this.pagoExito=false;
    this.formulario=this.formBuilder.group({
      formulario12: [],
    })

    this.formulario2=this.formBuilder.group({
      metodo: [, Validators.required]
    })




  

    this.porPagar=false;

    this.listadoHoy();
    this.traerServiciosYDetalles();
    this.traerMetodosPagos()

    this.authService.currentEmpleado$.subscribe({
      next: respuesta => this.empl=respuesta
    })

    this.formulario2.controls['metodo'].valueChanges.subscribe({
      next: respuesta =>{

        this.subscripcion.add(
          this.metodopagoService.obtenerPorId(respuesta).subscribe({
            next: respuesta =>{
              this.metodo=respuesta
            } ,
            error: () => {
            },
          })
        )

      },
    })
  
    
  }

  traerMetodosPagos(){
    this.subscripcion.add(
      this.metodopagoService.obtenerTodas().subscribe({
        next: respuesta =>{
          this.metodos=respuesta
        } ,
        error: () => {
          Swal.fire({
            title: 'error los metodos de pago',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    )
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
            this.listaDetalle.push(this.auxDetalle);
          }
          
          if(respuesta==null){
            Swal.fire({
              title: 'Error al obtener los Servicios y Detalles',
              icon: 'error',
              confirmButtonText: "Ok",
            });
          }
        } ,
        error: () => {
          Swal.fire({
            title: 'error al obtener el listado',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    )

  }

  check(det: Detalle){
   console.log(this.formulario.controls['formulario12'].value) 
   if(this.formulario.controls['formulario12'].value){
    this.precioTotal+=det.precio

    for (let index = 0; index < this.Detalles.length; index++) {
      const element = this.Detalles[index];
      if(element.servicio.descripcion==det.servicio.descripcion){
        console.log("ya se habia agregado")
        return
      }
      
    }
    this.Detalles.push(det)
    console.log(this.Detalles)


   }else{
    this.precioTotal-=det.precio


    for (let index = 0; index < this.Detalles.length; index++) {
      const element = this.Detalles[index];

      if(element.servicio.descripcion==det.servicio.descripcion){
        this.Detalles.splice(index,1)
      }else{
        console.log("no se encontraba")
      }
      
    }

    console.log(this.Detalles)

   }
   
  }

  confirmarOrden(){

    /*
    if(this.formulario2.controls['metodo'].value==5){
      console.log("mercado apgo")

      this.subscripcion.add(
        this.ordenService.mercadoPago(this.orden).subscribe({
          next: respuesta =>{ 
            console.log(respuesta)


          } ,
          error: (e) => {
            console.log(e.error.message)
          },
        })
      )

      return
    }


    */
  

    if(this.precioTotal>0){

       if(this.formulario2.controls['metodo'].invalid){
       Swal.fire({
              title: 'Debe seleccionar un metodo de pago',
              icon: 'error',
              confirmButtonText: "Ok",
            });
      return
    }
      this.orden=new Orden;
      this.orden.detalle=this.Detalles;
      this.orden.empleado=this.empl;
      this.orden.total=this.precioTotal;
      this.orden.metodoPago=this.metodo;
      this.orden.turno=this.turnoPorPagar;





      Swal.fire({
        title: `¿Desea confirmar el registro de la Orden?`  ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) =>{
        if(result.isConfirmed){ 

          this.subscripcion.add(
            this.ordenService.guardar(this.orden).subscribe({
              next: respuesta =>{ 
                Swal.fire({
                  title: 'Orden Registrada exitosamente!',
                  icon: 'success',
                  confirmButtonText: "Ok",
                });
                
                this.ordenGenerada=new Orden;
                this.ordenGenerada.detalle=[];
                this.ordenGenerada=respuesta;
               // this.ordenGenerada.detalle=this.Detalles
                console.log("estoy hay en detalles")
                console.log(this.Detalles)
                console.log("estoy hay en detalles")
                console.log(this.ordenGenerada.detalle)
                this.ordenGenerada.turno=this.turnoPorPagar;
                this.factura();
                this.listadoHoy();
                this.cancelar();
  
    
              } ,
              error: () => {
                Swal.fire({
                  title: 'error al registrar la orden',
                  icon: 'error',
                  confirmButtonText: "Ok",
                });
              },
            })
          )
  
       
      
        }
      })
  

  

      
  


    }else{
      Swal.fire({
        title: 'Es necesario selecionar algun item para generar la orden de trabajo',
        icon: 'error',
        confirmButtonText: "Ok",
      });
    }

  }

  cancelar(){
    this.formulario.controls['formulario12'].setValue(false);
    this.precioTotal=0;
    this.porPagar=false;
    this.Detalles.splice(0,4)
   
  }

  listadoHoy(){
    this.subscripcion.add(
      this.turnoservice.obtenerListadoHoy().subscribe({
        next: respuesta =>{
          this.turnos=respuesta
          if(respuesta==null){
            Swal.fire({
              title: 'Actualmente no hay ningun tramite para abonar',
              icon: 'error',
              confirmButtonText: "Ok",
            });
          }
        } ,
        error: () => {
          Swal.fire({
            title: 'error al obtener el listado',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    )
  }

  pagar(turno: Turno){
    this.usuario=new Usuario;
    this.vehiculo=new Vehiculo;
    this.turnoPorPagar=turno;
    this.porPagar=true;
    this.pro=this.turnoPorPagar.usuario.provincia
    this.mar=this.turnoPorPagar.vehiculo.marca
    this.vehiculo=this.turnoPorPagar.vehiculo
 

    this.formularioUsuario=this.formBuilder.group({
      documento: [, Validators.required],
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      email: [, Validators.required],
      telefono: [, Validators.required],
      domicilio: [, Validators.required],
      provincia: [, Validators.required]

    })

    this.formVehiculo=this.formBuilder.group({
      patente: [, Validators.required],
      chasis: [, Validators.required],
      motor: [, Validators.required],
      modelo: [, Validators.required],
      tipo: [, Validators.required],
      marca: [, Validators.required]

    })


    this.formularioUsuario.controls['documento'].setValue(this.turnoPorPagar.usuario.documento);
    this.formularioUsuario.controls['nombre'].setValue(this.turnoPorPagar.usuario.nombre);
    this.formularioUsuario.controls['apellido'].setValue(this.turnoPorPagar.usuario.apellido);
    this.formularioUsuario.controls['telefono'].setValue(this.turnoPorPagar.usuario.telefono);
    this.formularioUsuario.controls['email'].setValue(this.turnoPorPagar.usuario.email);
    this.formularioUsuario.controls['provincia'].setValue(this.pro.idProvincia);
    this.formularioUsuario.controls['domicilio'].setValue(this.turnoPorPagar.usuario.domicilio);


    this.formVehiculo.controls['motor'].setValue(this.turnoPorPagar.vehiculo.motor);
    this.formVehiculo.controls['chasis'].setValue(this.turnoPorPagar.vehiculo.chasis);
    this.formVehiculo.controls['modelo'].setValue(this.turnoPorPagar.vehiculo.modelo);
    this.formVehiculo.controls['tipo'].setValue(this.turnoPorPagar.vehiculo.tipo);
    this.formVehiculo.controls['marca'].setValue(this.turnoPorPagar.vehiculo.marca.idMarca);
    this.formVehiculo.controls['patente'].setValue(this.turnoPorPagar.vehiculo.patente);


    this.subscripcion.add(
      this.marcaService.obtenerTodas().subscribe({
        next: (respuesta) => this.marcas=respuesta,
        error: () => {
          console.log('Error al cargar las marcas');
        },
      })
    );


    this.subscripcion.add(
      this.provinciaService.obtenerTodas().subscribe({
        next: (respuesta) => this.provincias=respuesta,
        error: () => {
          
        },
      })
    );

    this.subscripcion.add(
      this.formularioUsuario.controls['provincia'].valueChanges.subscribe({
        next: (valor) =>{
          this.provinciaService.obtenerPorId(valor).subscribe({
            next: (respuesta) => this.pro = respuesta,
            error: () => console.log('error al intentar guardar la provincia seleccionada')
          })
        }
      })
    )

    this.subscripcion.add(
      this.formVehiculo.controls['marca'].valueChanges.subscribe({
        next: (valor) =>{
          this.marcaService.obtenerPorId(valor).subscribe({
            next: (respuesta) =>{
              this.mar = respuesta
 
            },
            error: () => {

            }
          })
        }
      })
    )

    this.porPagar=true;
  }

  guardarUsuario(){

    if(this.formularioUsuario.invalid){
      Swal.fire({
        title: 'Debe completar todos los campos',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    this.usuario.documento= this.formularioUsuario.controls['documento'].value;
    this.usuario.nombre= this.formularioUsuario.controls['nombre'].value.toUpperCase();
    this.usuario.apellido= this.formularioUsuario.controls['apellido'].value.toUpperCase();
    this.usuario.email= this.formularioUsuario.controls['email'].value;
    this.usuario.telefono= this.formularioUsuario.controls['telefono'].value;
    this.usuario.domicilio= this.formularioUsuario.controls['domicilio'].value.toUpperCase();
    this.usuario.provincia=this.pro;

    Swal.fire({
      title: `¿Desea confirmar la modificacion del Usuario?`  ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){ 

        this.subscripcion.add(
          this.usuarioService.guardar(this.usuario).subscribe({
            next: (respuesta)=>{
              this.usuario=respuesta
              this.formularioUsuario.patchValue(this.usuario)
              this.formularioUsuario.controls['provincia'].setValue(this.usuario.provincia.idProvincia)
              this.turnoPorPagar.usuario=this.usuario

              Swal.fire({
                title: `Usuario ${this.usuario.apellido + " " + this.usuario.nombre} modificado con exito!`,
                icon: 'success',
                confirmButtonText: "Ok",
              });
             
            },
            error: ()=> {
              console.log("Error al registrar el usuario")
            }
          })    
        )
    
      }
    })

  }

  guardarVehiculo(){
    if(this.formVehiculo.invalid){
      Swal.fire({
        title: 'Debe completar todos los campos',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    
    this.vehiculo.patente=this.formVehiculo.controls['patente'].value.toUpperCase();
    this.vehiculo.motor=this.formVehiculo.controls['motor'].value.toUpperCase();
    this.vehiculo.chasis=this.formVehiculo.controls['chasis'].value.toUpperCase();
    this.vehiculo.modelo=this.formVehiculo.controls['modelo'].value.toUpperCase();
    this.vehiculo.tipo=this.formVehiculo.controls['tipo'].value;
    this.vehiculo.marca=this.mar;


    Swal.fire({
      title: `¿Desea confirmar la modificacion del Vehiculo?`  ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){ 

        this.subscripcion.add(
          this.vehiculoService.guardar(this.vehiculo).subscribe({
            next: (respuesta)=>{
  
              this.vehiculo=respuesta;
              this.turnoPorPagar.vehiculo=this.vehiculo
              Swal.fire({
                title: `Vehiculo ${this.vehiculo.patente} modificado con exito!`,
                icon: 'success',
                confirmButtonText: "Ok",
              });
            },
            error: ()=> {
              console.log("Error al registrar el vehiculo")
            }
          })
          
        )
    
      }
    })


    
    
  }

  eliminar(id: number){
    this.subscripcion.add(
      this.turnoservice.delete(id).subscribe({
        next: () =>{
          console.log('Turno eliminado correctamente')
          
          this.listadoHoy();

        },
        error: () => {
          console.log('Error al eliminar el turno');
        },
      })
    );
    
  }


  salirTurno(){
    this.porPagar=false;
    this.pagoExito=false;
  }
  
  factura(){
    this.porPagar=false;
    this.pagoExito=true;
  }


  pdf() {
    var data = document.getElementById('invoice');
    if(data !== null) {
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        let imgWidth = 208;   
        let imgHeight = canvas.height * imgWidth / canvas.width;  
  
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        let position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('FACTURA' + '_' + this.ordenGenerada.idOrden + '.pdf'); // Generated PDF   
      });
    }
  }


}
