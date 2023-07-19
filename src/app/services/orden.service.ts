import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orden } from '../models/orden';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private URL: string = 'http://localhost:8080/orden';
  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Orden[]>{
    return this.http.get<Orden[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Orden>{
    return this.http.get<Orden>(`${this.URL}/${id}`);
  }
  guardar(orden: Orden): Observable<Orden>{
    return this.http.post<Orden>(`${this.URL}/crear`, orden)
  }
  mercadoPago(orden: Orden): Observable<Orden>{
    return this.http.post<Orden>(`${this.URL}/mercadoPago`, orden)
  }
  actualizar(orden: Orden): Observable<Orden>{
    return this.http.post<Orden>(`${this.URL}/actualizar`, orden)
  }
  borrado(orden: Orden): Observable<Orden>{
    return this.http.post<Orden>(`${this.URL}/borrado`, orden)
  }
  obtenerPorFechas(fecha1: Date, fecha2: Date): Observable<Orden[]> {
    return this.http.get<Orden[]>(`${this.URL}/porFechas` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }
}
