import { Component, OnInit } from '@angular/core';
import { Empleado } from '../models/empleado';
import { HelperService } from '../services/helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  inicio: boolean;
  empleado: Empleado;
  currentID: number;
  private subscription = new Subscription();

  constructor(private helperservice: HelperService){

  }
  ngOnInit(): void {
    this.inicio=false;
    this.currentID=0;
    console.log(this.currentID)
    this.helperservice.customMessage.subscribe(num=>{
      this.currentID=num
      console.log(this.currentID)
      if(this.currentID>0){
        this.inicio=true;
      } 
    })

    this.helperservice.currentEmpleado.subscribe( currentEmpleado =>{
      this.empleado = currentEmpleado;
    })
    

  }



}
