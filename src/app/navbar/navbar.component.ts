import { Component, OnInit } from '@angular/core';
import { Empleado } from '../models/empleado';
import { HelperService } from '../services/helper.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  inicio: boolean;
  empleado: Empleado;
  currentID: number;
  subscription = new Subscription();
  isLogin: boolean=false;


  constructor(private helperservice: HelperService, private authService: AuthService){

  }
  ngOnInit(): void {

    this.generico();


     this.authService.currentEmpleado$.subscribe( currentEmpleado =>{
      this.empleado = currentEmpleado;
      this.currentID= this.empleado.idEmpleado
    })

    this.authService.isLoggedIn$.subscribe(respuesta => this.isLogin=respuesta)

  
  }

  generico(){
    this.empleado=new Empleado;
    this.empleado.idEmpleado=0;
  }

  cerrarSesion(){
    this.authService.cerrarSesion();
  
  }




}
