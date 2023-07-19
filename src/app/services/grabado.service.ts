import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grabado } from '../models/grabado';

@Injectable({
  providedIn: 'root'
})
export class GrabadoService {

  private URL: string = 'http://localhost:8080/grabado';
  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Grabado[]>{
    return this.http.get<Grabado[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Grabado>{
    return this.http.get<Grabado>(`${this.URL}/${id}`);
  }
  guardar(grabado: Grabado): Observable<Grabado>{
    return this.http.post<Grabado>(`${this.URL}/crear`, grabado)
  }

  obtenerPorFechas(fecha1: Date, fecha2: Date): Observable<Grabado[]> {
    return this.http.get<Grabado[]>(`${this.URL}/porFechas` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }

  obtenerPorPatente(patente: String): Observable<Grabado[]> {
    return this.http.get<Grabado[]>(`${this.URL}/porPatente` + "?patente=" + patente)
  }

  grabadoAutopartes(grabado: Grabado): Observable<Grabado>{
    return this.http.post<Grabado>(`${this.URL}/autopartes`, grabado)
  }

  grabadoCristales(grabado: Grabado): Observable<Grabado>{
    return this.http.post<Grabado>(`${this.URL}/cristales`, grabado)
  }


  eliminar(id: number): Observable<Grabado>{
    return this.http.get<Grabado>(`${this.URL}/borrar/${id}`);
  }
  delete(id: number): Observable<Grabado>{
    return this.http.get<Grabado>(`${this.URL}/delete/${id}`)
  }
}
