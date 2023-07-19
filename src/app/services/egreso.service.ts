import { Injectable } from '@angular/core';
import { Egreso } from '../models/egreso';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  private URL: string = 'http://localhost:8080/egreso';
  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Egreso[]>{
    return this.http.get<Egreso[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Egreso>{
    return this.http.get<Egreso>(`${this.URL}/${id}`);
  }
  guardar(egreso: Egreso): Observable<Egreso>{
    return this.http.post<Egreso>(`${this.URL}/crear`, egreso)
  }

  obtenerPorFechas(fecha1: Date, fecha2: Date): Observable<Egreso[]> {
    return this.http.get<Egreso[]>(`${this.URL}/porFechas` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }

  eliminar(id: number): Observable<Egreso>{
    return this.http.get<Egreso>(`${this.URL}/borrar/${id}`);
  }
}


