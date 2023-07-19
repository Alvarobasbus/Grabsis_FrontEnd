import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formulario } from '../models/formulario';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private URL: string = 'http://localhost:8080/formulario';
  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Formulario[]>{
    return this.http.get<Formulario[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Formulario>{
    return this.http.get<Formulario>(`${this.URL}/${id}`);
  }
  guardar(formulario: Formulario): Observable<Formulario>{
    return this.http.post<Formulario>(`${this.URL}/crear`, formulario)
  }

  obtenerPorFechas(fecha1: Date, fecha2: Date): Observable<Formulario[]> {
    return this.http.get<Formulario[]>(`${this.URL}/porFechas` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }

  eliminar(id: number): Observable<Formulario>{
    return this.http.get<Formulario>(`${this.URL}/borrar/${id}`);
  }
}
