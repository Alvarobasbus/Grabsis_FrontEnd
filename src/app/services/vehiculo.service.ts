import { Injectable } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private URL: string = 'http://localhost:8080/vehiculo';
  constructor(private http: HttpClient) { }


  guardar(vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.post<Vehiculo>(`${this.URL}/crear`, vehiculo)
  }
  obtenerPorPatente(patente: string): Observable<Vehiculo>{
    return this.http.get<Vehiculo>(`${this.URL}/${patente}`);
  }
}
