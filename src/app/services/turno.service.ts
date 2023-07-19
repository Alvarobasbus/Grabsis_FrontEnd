import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turno } from '../models/turno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private URL: string = 'http://localhost:8080/turno';
  constructor(private http: HttpClient) { }


  guardar(turno: Turno): Observable<Turno>{
    return this.http.post<Turno>(`${this.URL}/crear`, turno)
  }

  registrarFormulario(turno: Turno): Observable<Turno>{
    return this.http.post<Turno>(`${this.URL}/registrarFormulario`, turno)
  }

  confirmar(turno: Turno): Observable<Turno>{
    return this.http.post<Turno>(`${this.URL}/confirmar`, turno)
  }
  
  obtenerPorFecha(fecha: Date): Observable<Turno[]>{
    return this.http.get<Turno[]>(`${this.URL}/${fecha}`);
  }

  obtenerListadoHoy(): Observable<Turno[]>{
    return this.http.get<Turno[]>(`${this.URL}/ListadoHoy`);
  }

  obtenerPorFechas(fecha1: Date, fecha2: Date): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.URL}/porFechas` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }

  obtenerPorPatente(patente: String): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.URL}/porPatente` + "?patente=" + patente)
  }

  obtenerPorUsuario(documento: number): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.URL}/porUsuario` + "?documento=" + documento)
  }

  obtenerPorFormulario(formulario: String): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.URL}/porFormulario` + "?formulario=" + formulario)
  }


  delete(id: number): Observable<Turno>{
    return this.http.get<Turno>(`${this.URL}/delete/${id}`)
  }
}
