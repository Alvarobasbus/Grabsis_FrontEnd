import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from '../models/servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private URL: string = 'http://localhost:8080/servicio';
  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Servicio>{
    return this.http.get<Servicio>(`${this.URL}/${id}`);
  }

  guardar(servicio: Servicio): Observable<Servicio>{
    return this.http.post<Servicio>(`${this.URL}/crear`, servicio)
  }

  actualizar(servicio: Servicio): Observable<Servicio>{
    return this.http.post<Servicio>(`${this.URL}/actualizar`, servicio)
  }
}
