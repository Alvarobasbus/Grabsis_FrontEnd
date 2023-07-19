import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detalle } from '../models/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  private URL: string = 'http://localhost:8080/detalle';
  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Detalle[]>{
    return this.http.get<Detalle[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Detalle>{
    return this.http.get<Detalle>(`${this.URL}/${id}`);
  }
  guardar(detalle: Detalle): Observable<Detalle>{
    return this.http.post<Detalle>(`${this.URL}/crear`, detalle)
  }
  eliminar(id: number): Observable<Detalle>{
    return this.http.get<Detalle>(`${this.URL}/borrar/${id}`);
  }
  obtenerPorFechas(fecha1: Date, fecha2: Date): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(`${this.URL}/porFechas` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }
}
