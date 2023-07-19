import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insumo } from '../models/insumo';
import { Observable } from 'rxjs';
import { DetalleInsumo } from '../models/detalleInsumo';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  private URL: string = 'http://localhost:8080/insumo';
  private URL2: string = 'http://localhost:8080/detalleinsumo';
  constructor(private http: HttpClient) { }

  guardar(insumo: Insumo): Observable<Insumo>{
    return this.http.post<Insumo>(`${this.URL}/crear`, insumo)
  }

  aumentar(insumo: Insumo): Observable<Insumo>{
    return this.http.post<Insumo>(`${this.URL}/aumentar`, insumo)
  }

  restar(insumo: Insumo): Observable<Insumo>{
    return this.http.post<Insumo>(`${this.URL}/restar`, insumo)
  }

  obtenerTodos(): Observable<Insumo[]>{
    return this.http.get<Insumo[]>(this.URL);
  }

  reponer(): Observable<Insumo[]>{
    return this.http.get<Insumo[]>(`${this.URL}/reponer`);
  }

  guardarDetalle(detalleInsumo: DetalleInsumo): Observable<DetalleInsumo>{
    return this.http.post<DetalleInsumo>(`${this.URL2}/crear`, detalleInsumo)
  }
}
