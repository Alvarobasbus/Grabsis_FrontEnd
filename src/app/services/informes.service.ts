import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformeInsumos } from '../models/informeInsumos';
import { Observable } from 'rxjs';
import { InformeServicios } from '../models/informeServicios';
import { InformeTurno } from '../models/informeTurno';

@Injectable({
  providedIn: 'root'
})
export class InformesService {
  private URL: string = 'http://localhost:8080/informe';
  constructor(private http: HttpClient) { }



  insumosAlta(fecha1: Date, fecha2: Date): Observable<InformeInsumos[]> {
    return this.http.get<InformeInsumos[]>(`${this.URL}/insumosAlta` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }


  insumosBaja(fecha1: Date, fecha2: Date): Observable<InformeInsumos[]> {
    return this.http.get<InformeInsumos[]>(`${this.URL}/insumosBaja` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }

  informeServicios(fecha1: Date, fecha2: Date): Observable<InformeServicios> {
    return this.http.get<InformeServicios>(`${this.URL}/informeServicios` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }

  informeTurnos(fecha1: Date, fecha2: Date): Observable<InformeTurno> {
    return this.http.get<InformeTurno>(`${this.URL}/informeTurnos` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }




}
