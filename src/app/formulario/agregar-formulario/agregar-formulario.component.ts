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
  selector: 'app-agregar-formulario',
  templateUrl: './agregar-formulario.component.html',
  styleUrls: ['./agregar-formulario.component.css']
})
export class AgregarFormularioComponent implements OnInit {

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
      fecha2: [, Validators.required]

    })

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


  agregarFormulario(){
    this.form12=new Formulario;
    if(this.formulario2.invalid){
      Swal.fire({
        title: 'Debe ingresar correctamente el numero de los formularios',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return
    }else{

      this.form12.empleado=this.empleadoLog
      this.form12.numeroFormulario=this.formulario2.controls['form1'].value;
      this.turno.formulario=this.form12;


      Swal.fire({
        title: `¿Desea agregar el numero de formulario :  ${this.form12.numeroFormulario}?`  ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) =>{
        if(result.isConfirmed){ 
          
      this.subscripcion.add(
        this.turnoService.registrarFormulario(this.turno).subscribe({
          next: (respuesta) =>{
              this.buscar()
              this.volver()
              this.formulario2.controls['form1'].setValue("")
              this.formulario2.controls['form2'].setValue("")
            console.log('Formulario registrado con exito')
            
          },
          error: () => {
            console.log('no fue posible registrar el formulario')
  
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

  modificar(lst: Turno){

    this.busqueda=false;
    this.resul=false;
    this.modi=true;
    this.turno=lst;


  }
  volver(){
    this.turno=new Turno;
    this.modi=false;
    this.buscar()
    this.busqueda=true;
    this.resul=true
    this.formulario2.controls['form1'].setValue("")
    this.formulario2.controls['form2'].setValue("")


  }

}
