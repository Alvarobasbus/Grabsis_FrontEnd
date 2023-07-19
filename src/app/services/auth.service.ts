import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { Empleado } from '../models/empleado';
import { EmpleadoService } from './empleado.service';
import { Router } from '@angular/router';

const USER_LOCAL_STORAGE_KEY = 'empleadoData';

const EMPLEADO_LOCAL_STORAGE_ID= 'empleadoID';

const EMPLEADO_LOCAL_STORAGE_ROL= 'empleadoROL';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subscripcion =new Subscription();
  empl: any;

  id: number;

  private currentEmpleadoSubject: BehaviorSubject<Empleado> = new BehaviorSubject({} as Empleado);
  public readonly currentEmpleado$: Observable<Empleado> = this.currentEmpleadoSubject.asObservable();
  //isLoggedIn$: Observable<boolean>;

  private currentID = new BehaviorSubject<number>(0);  
  public readonly isLoggedIn$ = new BehaviorSubject<boolean>(false);  



  public customMessage = this.currentID.asObservable();  


  constructor(private empleadoService: EmpleadoService, private router: Router) { 
    this.cargarEmpleadoDeLocalStorage();

   // window.addEventListener("beforeunload", () => localStorage.removeItem('empleadoID'));
    //window.addEventListener("beforeunload", () => localStorage.removeItem('empleadoROL'));
  }

  

  setCurrentEmpleado(currentEmpleado: Empleado): void {
    this.currentEmpleadoSubject.next(currentEmpleado);
    this.currentID.next(currentEmpleado.idEmpleado);
    this.isLoggedIn$.next(true);

    if(localStorage.getItem(USER_LOCAL_STORAGE_KEY)==null){
      this.guardarEmpleadoEnLocalStore(currentEmpleado);
    }
   
  }

  cerrarSesion(){
    localStorage.removeItem(EMPLEADO_LOCAL_STORAGE_ID);
    localStorage.removeItem(EMPLEADO_LOCAL_STORAGE_ROL);
    this.isLoggedIn$.next(false);
   this.router.navigateByUrl('');
  // window.location.reload()
  //this.empl.idEmpleado=null
  //this.empl.nombre=null;
  //this.empl.apellido=null;
   //this.setCurrentEmpleado(this.empl=new Empleado)

  }

  



  private cargarEmpleadoDeLocalStorage(): void {

    if(localStorage.getItem(EMPLEADO_LOCAL_STORAGE_ID)!=null){
      this.isLoggedIn$.next(true);
      const empleadoIDLocal= localStorage.getItem(EMPLEADO_LOCAL_STORAGE_ID);
      const empleadoRolLocal = localStorage.getItem(EMPLEADO_LOCAL_STORAGE_ROL);

      this.id= Number(empleadoIDLocal);    
  
      this.subscripcion.add(
        this.empleadoService.obtenerPorId(this.id).subscribe({
          next: (respuesta) => {
            this.setCurrentEmpleado(respuesta)
          },
          error: () => {
            console.log('Error al cargar los datos del empelado guardado');
          },
        })
      );

      this.router.navigate(['empleado']);

    }

     

  }

  private guardarEmpleadoEnLocalStore(empleado: Empleado): void {
    localStorage.setItem(EMPLEADO_LOCAL_STORAGE_ID, empleado.idEmpleado.toString())
    localStorage.setItem(EMPLEADO_LOCAL_STORAGE_ROL, empleado.rol.descripcion)
  
  }



}
