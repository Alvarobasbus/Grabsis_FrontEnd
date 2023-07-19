import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deposito } from '../models/deposito';

@Injectable({
  providedIn: 'root'
})
export class DepositoService {
  private URL: string = 'http://localhost:8080/deposito';
  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Deposito[]>{
    return this.http.get<Deposito[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Deposito>{
    return this.http.get<Deposito>(`${this.URL}/${id}`);
  }
  guardar(deposito: Deposito): Observable<Deposito>{
    return this.http.post<Deposito>(`${this.URL}/crear`, deposito)
  }

  obtenerPorFechas(fecha1: Date, fecha2: Date): Observable<Deposito[]> {
    return this.http.get<Deposito[]>(`${this.URL}/porFechas` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }

  eliminar(id: number): Observable<Deposito>{
    return this.http.get<Deposito>(`${this.URL}/borrar/${id}`);
  }
}
