import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './inicio/principal/principal.component';
import { IniciarSesionComponent } from './inicio/iniciar-sesion/iniciar-sesion.component';
import { RegistrarTurnoComponent } from './Turno/registrar-turno/registrar-turno.component';

const routes: Routes = [
  { path: "", component: PrincipalComponent },
  { path: "login", component: IniciarSesionComponent },
  { path: "turno", component: RegistrarTurnoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
