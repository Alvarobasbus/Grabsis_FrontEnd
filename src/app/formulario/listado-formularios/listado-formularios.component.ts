import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Formulario } from 'src/app/models/formulario';
import { Turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { TurnoService } from 'src/app/services/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-formularios',
  templateUrl: './listado-formularios.component.html',
  styleUrls: ['./listado-formularios.component.css']
})
export class ListadoFormulariosComponent implements OnInit {

  formulario: FormGroup;
  formulario2: FormGroup;

  modi: boolean;

  empleadoLog: Empleado;
  isLogin: boolean=false;
  hoy= new Date;
  pipe = new DatePipe('en-US');
  fechaHoy:any;
  fecha1: any;
  fecha2: any;
  public page: number;
  resul: boolean;
  busqueda: boolean;
  turnos: Turno[]=[];
  turno: Turno;
  form12: Formulario;

  dominio: boolean
  nformulario: boolean
  texto: String;

  formcambio: Formulario;



  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder,
    private turnoService: TurnoService,
    private formularioService: FormularioService,
    private authService: AuthService,
    private router: Router){

  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)
 

    if(this.isLogin==false){
        this.router.navigate(['']);
      }
    this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleadoLog = currentEmpleado;
    })

    this.modi=false;
    this.busqueda=true;
    this.resul=false;
    this.formulario=this.formBuilder.group({
      fecha1: [, Validators.required],
      fecha2: [, Validators.required],
      patente: [, Validators.required],
      formulario: [, Validators.required],
      select: [, Validators.required]

    })

    this.formulario.controls['select'].setValue("fecha")

    this.formulario2=this.formBuilder.group({
      form1: ["", Validators.required],
      form2: ["", Validators.required]

    },
    {
      validators: [this.checkPasswords]
    })

    this.setFechaActual()
  }

  checkPasswords: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get("form1");
    const password_repeat = control.get("form2");
    
    return password &&
      password_repeat &&
      password.value !== password_repeat.value
      ? { passwordCoincide: false }
      : null;
  };

  modificarFormulario(){
  
    if(this.formulario2.invalid){
      Swal.fire({
        title: 'Debe ingresar correctamente el numero de los formularios',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }else{

      if(this.formulario2.controls['form1'].value===this.form12.numeroFormulario){
        Swal.fire({
          title: 'El numero de formulario ingresado coincide con el registrado',
          icon: 'error',
          confirmButtonText: "Ok",
        });
        return
      }

      this.form12.empleado=this.empleadoLog
      this.form12.numeroFormulario=this.formulario2.controls['form1'].value;


      Swal.fire({
        title: `¿Desea modificar el numero de formulario :  ${this.form12.numeroFormulario}?`  ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) =>{
        if(result.isConfirmed){ 
          
      this.subscripcion.add(
        this.formularioService.guardar(this.form12).subscribe({
          next: (respuesta) =>{
            if(this.nformulario=true){
              this.formulario.controls['formulario'].setValue(this.texto)
            }
            if(this.dominio=true){
              this.formulario.controls['patente'].setValue(this.texto)

            }
              this.buscar()
              this.volver()
            console.log('Formulario modificado con exito')
            
          },
          error: () => {
            console.log('no fue posible modificar el formulario')
  
          },
        })
      );
  
  
  
      
        }
      })

    }



  }

  



  setFechaActual(){
    // this.fechaHoy= this.pipe.transform(this.hoy, 'dd/MM/YYYY');
    this.fechaHoy= this.pipe.transform(this.hoy, 'YYYY-MM-dd');
     this.formulario.controls['fecha1'].setValue(this.fechaHoy)
     this.formulario.controls['fecha2'].setValue(this.fechaHoy)
    this.buscar()
   }

   
  buscar(){
    if(this.formulario.controls['select'].value=="fecha"){
      this.dominio=false;
      this.nformulario=false;
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

      this.turnos=[];
  
      this.fecha1=this.formulario.controls['fecha1'].value;
      this.fecha2=this.formulario.controls['fecha2'].value
  
  
      this.subscripcion.add(
        this.turnoService.obtenerPorFechas(this.fecha1,this.fecha2).subscribe({
          next: (respuesta) =>{
            this.turnos=respuesta;
  
  
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
    
    
    
    if(this.formulario.controls['select'].value=="patente"){

      if(this.formulario.controls['patente'].value==null){
        Swal.fire({
          title: 'Debe ingresar la patente',
          icon: 'error',
          confirmButtonText: "Ok",
        });

        return
      }

      this.turnos=[];


      this.subscripcion.add(
        this.turnoService.obtenerPorPatente(this.formulario.controls['patente'].value).subscribe({
          next: (respuesta) =>{
            this.turnos=respuesta;
            this.nformulario=false;
            this.dominio=true;
            this.texto=this.formulario.controls['patente'].value;
            this.formulario.controls['patente'].setValue("")

            
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

    if(this.formulario.controls['select'].value=="formulario" ){

      if(this.formulario.controls['formulario'].value==null){
        Swal.fire({
          title: 'Debe ingresar el numero de formulario',
          icon: 'error',
          confirmButtonText: "Ok",
        });

        return
      }

      this.turnos=[];


      this.subscripcion.add(
        this.turnoService.obtenerPorFormulario(this.formulario.controls['formulario'].value).subscribe({
          next: (respuesta) =>{
            this.turnos=respuesta;
            this.nformulario=true;
            this.dominio=false;
            this.texto=this.formulario.controls['formulario'].value;
            this.formulario.controls['formulario'].setValue("")

            
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

  modificar(lst: Turno){

    if(this.empleadoLog.rol.descripcion!="Gerente"){
      Swal.fire({
        title: 'Permiso denegado!',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return;

    }

    this.busqueda=false;
    this.resul=false;
    this.modi=true;
    this.turno=lst;
    this.form12=lst.formulario;

    this.formulario2.controls['form1'].setValue(this.turno.formulario.numeroFormulario)
    this.formulario2.controls['form2'].setValue(this.turno.formulario.numeroFormulario)


  }
  volver(){
    this.turno=new Turno;
    this.modi=false;
    this.buscar()
    this.busqueda=true;
    this.resul=true



  }

}
