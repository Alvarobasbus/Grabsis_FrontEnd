import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Marca } from 'src/app/models/marca';
import { Provincia } from 'src/app/models/provincia';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-registrar-turno',
  templateUrl: './registrar-turno.component.html',
  styleUrls: ['./registrar-turno.component.css']
})

export class RegistrarTurnoComponent implements OnInit {

  usuario: Usuario;
  vehiculo: Vehiculo;
  turno: Turno;
  formulario: FormGroup;
  formDni: FormGroup;
  formVehiculo: FormGroup;
  formPatente: FormGroup;
  formTurno: FormGroup;
  provincias: Provincia[];
  marcas: Marca[];
  pro: Provincia;
  mar: Marca;
  user: boolean;
  mostrarVehiculo: boolean;
  mostrarRegistroTurno: boolean;
  myFilter: any;
  currentID: number=0;
  isLogin: boolean=false;
  usuarioRegistrado: boolean=false;
  vehiculoRegistrado: boolean=false;
  empleado: Empleado;

  registroExito:boolean=false;

  fase1:boolean=false;
  fase2:boolean=false;
  fase3:boolean=false;
  pipe = new DatePipe('en-US');
  fechaa: any

  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder, private router: Router, private provinciaService: ProvinciaService,
    private usuarioService: UsuarioService, private marcaService: MarcaService, private vehiculoService: VehiculoService,
    private turnoService: TurnoService,
    private helperService: HelperService,
    private authService: AuthService,
    private dateAdapter: DateAdapter<Date>){
  
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
     // this.dateAdapter.setLocale('es-ES')
  }
  fecha23=['2023-07-14', '2023-07-20', '2023-07-25']
  fechann: any;

  dateFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
      const day = date?.getDay();
      this.fechaa= this.pipe.transform(date, 'YYYY-MM-dd');
      //console.log(this.fechaa)
     
      return day !== 0 && day !== 6 && this.filtradofecha(this.fechaa) && this.filtradofechaHoy(this.fechaa)
      //0 means sunday
      //6 means saturday
  }

  filtradofechaHoy(fecha: any):boolean{
    let boolean=true;
    var d2=fecha;

    var d = new Date();
    d2 = this.pipe.transform(d, 'YYYY-MM-dd');
    if(fecha<=d2 && !this.isLogin){
      boolean=false;
    }
    if(fecha<d2 && this.isLogin){
      boolean=false;
    }
    return boolean;
  }

  filtradofecha(fecha: any): boolean{
    let boolean=true;
    for (let index = 0; index < this.fecha23.length; index++) {
      const element = this.fecha23[index];
      if(element== fecha)  boolean=false;
    }
    return boolean;

  }
 
  
  fiter2: (date: Date | null) => boolean =
    (date: Date | null) => {
      const day = date?.getDay();

      console.log("hola")
      return day !== 0 && day !== 6;
      //0 means sunday
      //6 means saturday
  }

  ngOnInit(): void {

    

    this.registroExito=false;
    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)
    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleado = currentEmpleado;
      this.currentID= this.empleado.idEmpleado
    })
    this.user=true;
    this.mostrarVehiculo=false;
    this.mostrarRegistroTurno=false;

    this.formDni=this.formBuilder.group({
      documento: [, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    }
    )


    this.formulario=this.formBuilder.group({
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      email: [,],
      telefono: [,],
      domicilio: [, Validators.required],
      provincia: [, Validators.required]

    }
    )

    this.deshabilitarUsuario()
   

    this.helperService.customMessage.subscribe(num=>{
      this.currentID=num
      console.log(this.currentID)
 
    })



    this.subscripcion.add(
      this.provinciaService.obtenerTodas().subscribe({
        next: (respuesta) => this.provincias=respuesta,
        error: () => {
          console.log('Error al cargar las provincias');
        },
      })
    );





    this.formDni.valueChanges.subscribe({
      next: (valor) =>{
        this.deshabilitarUsuario();
        this.borrar();
        
        if(this.formDni.valid){
          console.log(this.formDni.controls['documento'].value)

          this.subscripcion.add(
            this.usuarioService.obtenerPorId(this.formDni.controls['documento'].value).subscribe({
              next: (respuesta) =>{
                if(respuesta!=null){

                  this.usuario=respuesta
                  this.formulario.controls['nombre'].setValue(this.usuario.nombre);
                  this.formulario.controls['apellido'].setValue(this.usuario.apellido);
                  this.formulario.controls['telefono'].setValue(this.usuario.telefono);
                  this.formulario.controls['email'].setValue(this.usuario.email);
                  this.formulario.controls['provincia'].setValue(this.usuario.provincia?.idProvincia);
                  this.formulario.controls['domicilio'].setValue(this.usuario.domicilio);
                  this.usuarioRegistrado=true;
                  console.log(this.usuarioRegistrado)
                }
              }, 
              error: () => {
                this.habilitarUsuario();
                this.usuarioRegistrado=false;
                console.log(this.usuarioRegistrado)
              },
            })
          );
        }
      }
    })


    
  }

  borrar(){
    this.formulario.controls['nombre'].setValue("");
    this.formulario.controls['apellido'].setValue("");
    this.formulario.controls['telefono'].setValue("");
    this.formulario.controls['email'].setValue("");
    this.formulario.controls['provincia'].setValue("");
    this.formulario.controls['domicilio'].setValue("");
    this.usuarioRegistrado=false;
  }

  limpiar(){
    this.formulario.controls['nombre'].setValue("");
    this.formulario.controls['apellido'].setValue("");
    this.formulario.controls['telefono'].setValue("");
    this.formulario.controls['email'].setValue("");
    this.formulario.controls['provincia'].setValue("");
    this.formulario.controls['domicilio'].setValue("");
    this.formDni.controls['documento'].setValue("");
    this.usuarioRegistrado=false;

  }
  


 




  deshabilitarUsuario(){
    this.formulario.controls['nombre'].disable();
    this.formulario.controls['apellido'].disable();
    this.formulario.controls['telefono'].disable();
    this.formulario.controls['email'].disable();
    this.formulario.controls['provincia'].disable();
    this.formulario.controls['domicilio'].disable();

  }
  habilitarUsuario(){
    this.formulario.controls['nombre'].enable();
    this.formulario.controls['apellido'].enable();
    this.formulario.controls['telefono'].enable();
    this.formulario.controls['email'].enable();
    this.formulario.controls['provincia'].enable();
    this.formulario.controls['domicilio'].enable();

    this.subscripcion.add(
      this.formulario.controls['provincia'].valueChanges.subscribe({
        next: (valor) =>{
          this.provinciaService.obtenerPorId(valor).subscribe({
            next: (respuesta) => this.pro = respuesta,
            error: () => console.log('error al intentar guardar la provincia seleccionada')
          })
        }
      })
    )

  }


  guardarUsuario(){
    this.fase1=true;

    if(this.fase2==true){
      this.user=false;
    this.mostrarVehiculo=true;
      return
    }

    if(this.usuarioRegistrado==false){

      if(this.formulario.invalid){
        Swal.fire({
          title: 'Debe completar todos los campos',
          icon: 'error',
          confirmButtonText: "Ok",
        });
        return
      }
  
      this.usuario=this.formulario.value;
      this.usuario.documento= this.formDni.controls['documento'].value;
      this.usuario.nombre= this.formulario.controls['nombre'].value.toUpperCase();
      this.usuario.apellido= this.formulario.controls['apellido'].value.toUpperCase();
      this.usuario.email= this.formulario.controls['email'].value;
      this.usuario.telefono= this.formulario.controls['telefono'].value;
      this.usuario.domicilio= this.formulario.controls['domicilio'].value.toUpperCase();
      this.usuario.provincia=this.pro;
      this.usuario.isDeleted=false;

      if(this.usuarioRegistrado==false){
      
        this.subscripcion.add(
          this.usuarioService.guardar(this.usuario).subscribe({
            next: (respuesta)=>{
              console.log("Usuario registrado con exito")
              this.usuario=respuesta
              console.log(this.usuario)
              this.activarVehiculo();
            },
            error: ()=> {
              console.log("Error al registrar el usuario")
            }
          })
          
        )
      }
  

    }

    if(this.usuarioRegistrado==true){
      this.activarVehiculo();
      console.log(this.usuario)
    }
    
  }

  //Vehiculo
  activarVehiculo(){
    this.fase2=true;
    this.formVehiculo=this.formBuilder.group({
      chasis: [, Validators.required],
      motor: [, Validators.required],
      modelo: [, Validators.required],
      tipo: [, Validators.required],
      marca: [, Validators.required]

    })
    this.vehiculoRegistrado=false;
    this.deshabilitarVehiculo();

    this.formPatente=this.formBuilder.group({
      patente: [, [Validators.required, Validators.minLength(5), Validators.maxLength(7)]]
    }
    )

    this.formPatente.valueChanges.subscribe({
      next: (valor) =>{
        this.deshabilitarVehiculo();
        this.borrarVehiculo()
        
        if(this.formPatente.valid){

          this.subscripcion.add(
            this.vehiculoService.obtenerPorPatente(this.formPatente.controls['patente'].value).subscribe({
              next: (respuesta) =>{
                if(respuesta!=null){
                  this.vehiculo=respuesta
                  this.formVehiculo.controls['motor'].setValue(this.vehiculo.motor);
                  this.formVehiculo.controls['chasis'].setValue(this.vehiculo.chasis);
                  this.formVehiculo.controls['modelo'].setValue(this.vehiculo.modelo);
                  this.formVehiculo.controls['tipo'].setValue(this.vehiculo.tipo);
                  this.formVehiculo.controls['marca'].setValue(this.vehiculo.marca?.idMarca);

                  this.vehiculoRegistrado=true;
                }
              }, 
              error: () => {
                //this.borrar()
                this.habilitarVehiculo();


              },
            })
          );
        }
      }
    })






    this.subscripcion.add(
      this.marcaService.obtenerTodas().subscribe({
        next: (respuesta) => this.marcas=respuesta,
        error: () => {
          console.log('Error al cargar las marcas');
        },
      })
    );


    this.user=false;
    this.mostrarVehiculo=true;




  }


  deshabilitarVehiculo(){
    this.formVehiculo.controls['marca'].disable();
    this.formVehiculo.controls['tipo'].disable();
    this.formVehiculo.controls['modelo'].disable();
    this.formVehiculo.controls['motor'].disable();
    this.formVehiculo.controls['chasis'].disable();

  }

  habilitarVehiculo(){
    this.vehiculoRegistrado=false;
    this.formVehiculo.controls['marca'].enable();
    this.formVehiculo.controls['tipo'].enable();
    this.formVehiculo.controls['modelo'].enable();
    this.formVehiculo.controls['motor'].enable();
    this.formVehiculo.controls['chasis'].enable();


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

  }

  borrarVehiculo(){
    this.formVehiculo.controls['motor'].setValue("");
    this.formVehiculo.controls['chasis'].setValue("");
    this.formVehiculo.controls['modelo'].setValue("");
    this.formVehiculo.controls['tipo'].setValue("");
    this.formVehiculo.controls['marca'].setValue("");

  }

  guardarvehiculo(){

    if(this.fase3==true){
      this.mostrarVehiculo=false;
      this.mostrarRegistroTurno=true;
      return
    }

    if(this.formPatente.invalid){
      Swal.fire({
        title: 'Debe completar todos los campos',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }

    if(this.vehiculoRegistrado===false){


      if(this.formVehiculo.invalid){
        Swal.fire({
          title: 'Debe completar todos los campos',
          icon: 'error',
          confirmButtonText: "Ok",
        });
        return
      }

      this.vehiculo=this.formVehiculo.value;
      this.vehiculo.patente=this.formPatente.controls['patente'].value.toUpperCase();
      this.vehiculo.motor=this.formVehiculo.controls['motor'].value.toUpperCase();
      this.vehiculo.chasis=this.formVehiculo.controls['chasis'].value.toUpperCase();
      this.vehiculo.modelo=this.formVehiculo.controls['modelo'].value.toUpperCase();
      this.vehiculo.tipo=this.formVehiculo.controls['tipo'].value;
      this.vehiculo.marca=this.mar;


      if(this.vehiculoRegistrado==false){
        this.vehiculo.autopartes=false;
        this.vehiculo.cristales=false;
        this.subscripcion.add(
          this.vehiculoService.guardar(this.vehiculo).subscribe({
            next: (respuesta)=>{
              console.log('Vehiculo registrado correctamente')
              this.vehiculo=respuesta;

              console.log(this.vehiculo)
              this.activarRegistroTurno();
            },
            error: ()=> {
              console.log("Error al registrar el vehiculo")
            }
          })
          
        )
      }

    }

    if(this.vehiculoRegistrado===true){
      console.log(this.vehiculo)
      this.activarRegistroTurno();

    }

  }

  atrasHorario(){
    this.mostrarVehiculo=true;
    this.mostrarRegistroTurno=false;

  }
  atrasVehiculo(){
    if(this.fase1==true){
      
      this.user=true;
      this.mostrarVehiculo=false;
      return
    }
  }

  activarRegistroTurno(){
    this.fase3=true;
    this.formTurno=this.formBuilder.group({
      fecha: [, Validators.required],
      hora: [, Validators.required]
    })

    this.mostrarVehiculo=false;
    this.mostrarRegistroTurno=true;

  }

  confirmarTurno(){
    this.turno=new Turno;

    if(this.formTurno.invalid){
      Swal.fire({
        title: 'Debe completar todos los campos',
        icon: 'error',
        confirmButtonText: "Ok",
      });
    }


    if(this.isLogin==true){
      this.turno.empleado=this.empleado;
      console.log(this.formTurno.controls['fecha'].value)
      
    }
    this.turno.fecha=this.formTurno.controls['fecha'].value
    this.turno.hora=this.formTurno.controls['hora'].value
    this.turno.usuario=this.usuario;
    this.turno.vehiculo=this.vehiculo;

    Swal.fire({
      title: `¿Desea confirmar el registro del turno?`  ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){ 

        
    this.subscripcion.add(
      this.turnoService.guardar(this.turno).subscribe({
        next: (respuesta)=>{
          this.turno=respuesta
          console.log('Turno registrado correctamente')
          console.log(this.turno)
          this.registroExito=true;
          this.mostrarRegistroTurno=false;;
          
        },
        error: ()=> {
          console.log('error al registrar el turno')
        }
      })
      
    )
        
    
      }
    })




  }

  

  salirTurno(){

    if(this.isLogin){
      this.router.navigate(['empleado']);
    }else{
      this.router.navigate(['']);
    }
    
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
        pdf.save('turno' + '_' + this.turno.idTurno + '.pdf'); // Generated PDF   
      });
    }
  }

  


}
