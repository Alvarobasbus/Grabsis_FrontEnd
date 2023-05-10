import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private URL: string = 'http://localhost:8080/empleado';
  constructor(private http: HttpClient) { }

  postLogin(empleado: Empleado):Observable<Empleado>{
    const headers = { 'content-type': 'application/json', 'Access-Control-Allow-Headers': '*' };
    return this.http.post<Empleado>(`${this.URL}/login`, empleado);
  }

  guardar(empleado: Empleado): Observable<Empleado>{
    return this.http.post<Empleado>(`${this.URL}/crear`, empleado)
  }

  modificar(empleado: Empleado): Observable<Empleado>{
    return this.http.post<Empleado>(`${this.URL}/modificar`, empleado)
  }

  obtenerTodos(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.URL);
  }

  delete(id: number): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.URL}/delete/${id}`)
  }

  activar(id: number): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.URL}/activar/${id}`)
  }

  obtenerPorId(id: number): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.URL}/${id}`);
  }


}
