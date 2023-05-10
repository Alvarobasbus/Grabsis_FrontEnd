import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Marca } from 'src/app/models/marca';
import { Provincia } from 'src/app/models/provincia';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { Vehiculo } from 'src/app/models/vehiculo';
import { HelperService } from 'src/app/services/helper.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

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
  formVehiculo: FormGroup;
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


  private subscripcion =new Subscription();

  constructor(private formBuilder: FormBuilder, private router: Router, private provinciaService: ProvinciaService,
    private usuarioService: UsuarioService, private marcaService: MarcaService, private vehiculoService: VehiculoService,
    private turnoService: TurnoService,
    private helperService: HelperService){
  

  }
  

  ngOnInit(): void {
    this.user=true;
    this.mostrarVehiculo=false;
    this.mostrarRegistroTurno=false;
    this.formulario=this.formBuilder.group({
      documento: [, Validators.required],
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      email: [, Validators.required],
      telefono: [, Validators.required],
      domicilio: [, Validators.required],
      provincia: [, Validators.required]

    })

    this.helperService.customMessage.subscribe(num=>{
      this.currentID=num
      console.log(this.currentID)
 
    })



    this.subscripcion.add(
      this.provinciaService.obtenerTodas().subscribe({
        next: (respuesta) => this.provincias=respuesta,
        error: () => {
          alert('Error al cargar las provincias');
        },
      })
    );


    this.subscripcion.add(
      this.formulario.controls['provincia'].valueChanges.subscribe({
        next: (valor) =>{
          this.provinciaService.obtenerPorId(valor).subscribe({
            next: (respuesta) => this.pro = respuesta,
            error: () => alert('error al intentar guardar la provincia seleccionada')
          })
        }
      })
    )
    
  }


  guardarUsuario(){
    if(this.formulario.invalid){
      alert('Formulario invalido')
      return
    }

    this.usuario=this.formulario.value;
    this.usuario.documento= this.formulario.controls['documento'].value;
    this.usuario.nombre= this.formulario.controls['nombre'].value;
    this.usuario.apellido= this.formulario.controls['apellido'].value;
    this.usuario.email= this.formulario.controls['email'].value;
    this.usuario.telefono= this.formulario.controls['telefono'].value;
    this.usuario.domicilio= this.formulario.controls['domicilio'].value;
    this.usuario.provincia=this.pro;
    this.usuario.isDeleted=false;


    this.subscripcion.add(
      this.usuarioService.guardar(this.usuario).subscribe({
        next: ()=>{
          alert('Usuario registrado correctamente')

          this.activarVehiculo();
          console.log(this.usuario)
        },
        error: ()=> {
         alert('error al registrar el usuario')
        }
      })
      
    )
  }

  //Vehiculo
  activarVehiculo(){
    this.formVehiculo=this.formBuilder.group({
      patente: [, Validators.required],
      chasis: [, Validators.required],
      motor: [, Validators.required],
      modelo: [, Validators.required],
      tipo: [, Validators.required],
      marca: [, Validators.required]

    })


    this.subscripcion.add(
      this.marcaService.obtenerTodas().subscribe({
        next: (respuesta) => this.marcas=respuesta,
        error: () => {
          alert('Error al cargar las marcas');
        },
      })
    );


    this.user=false;
    this.mostrarVehiculo=true;


    this.subscripcion.add(
      this.formVehiculo.controls['marca'].valueChanges.subscribe({
        next: (valor) =>{
          this.marcaService.obtenerPorId(valor).subscribe({
            next: (respuesta) =>{
              this.mar = respuesta
 
            },
            error: () => alert('error al intentar guardar la marca seleccionada')
          })
        }
      })
    )

  }

  guardarvehiculo(){
    if(this.formVehiculo.invalid){
      alert('Formulario invalido')
      return
    }


    this.vehiculo=this.formVehiculo.value;
    this.vehiculo.marca=this.mar;


    this.subscripcion.add(
      this.vehiculoService.guardar(this.vehiculo).subscribe({
        next: ()=>{
          alert('Vehiculo registrado correctamente')

          this.activarRegistroTurno();
          console.log(this.vehiculo)
        },
        error: ()=> {
         alert('error al registrar el vehiculo')
        }
      })
      
    )

  }

  activarRegistroTurno(){
    this.formTurno=this.formBuilder.group({
      fecha: [, Validators.required],
      hora: [, Validators.required]
    })

    var date = new Date();

    this.formTurno.setValue({
      hora: "1",
      fecha: date
    })

    

    this.myFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      // Prevent Saturday and Sunday from being selected.
      return day !== 0 && day !== 6;
    };

    this.mostrarVehiculo=false;
    this.mostrarRegistroTurno=true;


  }

  confirmarTurno(){

    if(this.formTurno.invalid){
      alert('Formulario invalido')
      return
    }

    this.turno=this.formTurno.value;
    this.turno.usuario=this.usuario;
    this.turno.vehiculo=this.vehiculo;

    console.log("este es el turno que se va registrar")
    console.log(this.turno)

    this.subscripcion.add(
      this.turnoService.guardar(this.turno).subscribe({
        next: ()=>{
          alert('Turno registrado correctamente')
          console.log(this.turno)
        },
        error: ()=> {
         alert('error al registrar el turno')
        }
      })
      
    )



  }

  


}
