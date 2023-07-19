import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogeadoGuard implements CanMatch {
  constructor(private authService: AuthService){

  }

  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authService.isLoggedIn$.subscribe(respuesta => respuesta)){
        console.log("no estas logeado")
        return false;
      }
    return true;
  }
}
