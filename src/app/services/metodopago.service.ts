import { Injectable } from '@angular/core';
import { MetodoPago } from '../models/metodoPago';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {
  private URL: string = 'http://localhost:8080/metodopago';
  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<MetodoPago[]>{
    return this.http.get<MetodoPago[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<MetodoPago>{
    return this.http.get<MetodoPago>(`${this.URL}/${id}`);
  }
  guardar(metodoPago: MetodoPago): Observable<MetodoPago>{
    return this.http.post<MetodoPago>(`${this.URL}/crear`, metodoPago)
  }
}
