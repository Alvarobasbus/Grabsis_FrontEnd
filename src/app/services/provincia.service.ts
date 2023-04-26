import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincia } from '../models/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  private URL: string = 'http://localhost:8080/provincia';
  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Provincia>{
    return this.http.get<Provincia>(`${this.URL}/${id}`);
  }
}
