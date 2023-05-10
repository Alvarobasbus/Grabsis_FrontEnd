import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private URL: string = 'http://localhost:8080/marca';
  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Marca[]>{
    return this.http.get<Marca[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Marca>{
    return this.http.get<Marca>(`${this.URL}/${id}`);
  }
  guardar(marca: Marca): Observable<Marca>{
    return this.http.post<Marca>(`${this.URL}/crear`, marca)
  }
}
