import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit{

  formulario: FormGroup;
  fecha: Date;
  fecha2: any;
  turnos: Turno[];
  private subscripcion =new Subscription();
  


  constructor(private turnoservice: TurnoService,
    private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(): void {
    this.formulario=this.formBuilder.group({
      fecha: [, Validators.required]

    })

    console.log(Date.now)


  }

  buscar(){
    if(this.formulario.invalid){
      alert('debe introducir una fecha')
      return
    }

    this.fecha=this.formulario.controls['fecha'].value;
    //var datePipe = new DatePipe();
    this.fecha2 = this.datePipe.transform(this.fecha, 'dd/MM/yyyy');
   


    this.subscripcion.add(
      this.turnoservice.obtenerPorFecha(this.fecha).subscribe({
        next: (respuesta) =>{
          this.turnos=respuesta
        } ,
        error: () => {
          alert('No se encontraron turnos para la fecha: ' + this.fecha2 );
        },
      })
    );


  }

  eliminar(id: number){
    console.log("este es el id")
    console.log(id)

    this.subscripcion.add(
      this.turnoservice.delete(id).subscribe({
        next: (respuesta) =>{
          alert('Turno eliminado correctamente')
          this.formulario.controls['fecha'].setValue("");
          this.router.navigate(['listaturno']);


        },
        error: () => {
          alert('Error al turno el empleado');
        },
      })
    );
    
  }

}
