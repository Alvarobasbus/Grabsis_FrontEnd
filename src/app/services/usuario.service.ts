import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL: string = 'http://localhost:8080/Usuario';
  constructor(private http: HttpClient) { }


  guardar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.URL}/crear`, usuario)
  }
}