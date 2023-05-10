import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private URL: string = 'http://localhost:8080/rol';
  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Rol[]>{
    return this.http.get<Rol[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Rol>{
    return this.http.get<Rol>(`${this.URL}/${id}`);
  }


}
