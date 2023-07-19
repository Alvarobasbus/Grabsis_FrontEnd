import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformeCaja } from '../models/informeCaja';

@Injectable({
  providedIn: 'root'
})
export class InformeCajaService {
  private URL: string = 'http://localhost:8080/informeCaja';
  constructor(private http: HttpClient) { }



  obtenerPorFechas(fecha1: Date, fecha2: Date): Observable<InformeCaja> {
    return this.http.get<InformeCaja>(`${this.URL}/porFechas` + "?desde=" + fecha1 + "&hasta=" + fecha2)
  }


}
