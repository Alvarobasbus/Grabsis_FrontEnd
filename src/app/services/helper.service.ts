import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private currentEmpleadoSubject: BehaviorSubject<Empleado> = new BehaviorSubject({} as Empleado);
  public readonly currentEmpleado$: Observable<Empleado> = this.currentEmpleadoSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.currentEmpleado$.pipe(map(Boolean));

  private currentID = new BehaviorSubject<number>(0);  

  public customMessage = this.currentID.asObservable();  

  constructor() { }

  setCurrentEmpleado(currentEmpleado: Empleado): void {
    this.currentEmpleadoSubject.next(currentEmpleado);
  }

  setCurrentId(num:number): void{
    this.currentID.next(num);
  }
}
