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
  
  obtenerPorFecha(fecha: Date): Observable<Turno[]>{
    return this.http.get<Turno[]>(`${this.URL}/${fecha}`);
  }
  delete(id: number): Observable<Turno>{
    return this.http.get<Turno>(`${this.URL}/delete/${id}`)
  }
}
