import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './inicio/principal/principal.component';
import { IniciarSesionComponent } from './inicio/iniciar-sesion/iniciar-sesion.component';
import { RegistrarTurnoComponent } from './Turno/registrar-turno/registrar-turno.component';
import { EmpleadoComponent } from './inicio/empleado/empleado.component';
import { RegistrarComponent } from './empleado/registrar/registrar.component';
import { RegistrarUsuarioComponent } from './Usuario/registrar-usuario/registrar-usuario.component';
import { ListadoTurnosComponent } from './Turno/listado-turnos/listado-turnos.component';
import { ListadoEmpleadosComponent } from './empleado/listado-empleados/listado-empleados.component';
import { ModificarUsuarioComponent } from './Usuario/modificar-usuario/modificar-usuario.component';
import { EliminarUsuarioComponent } from './Usuario/eliminar-usuario/eliminar-usuario.component';
import { ModificarEmpleadoComponent } from './empleado/modificar-empleado/modificar-empleado.component';
import { RegistrarMarcaComponent } from './marca/registrar-marca/registrar-marca.component';


const routes: Routes = [
  { path: "", component: PrincipalComponent },
  { path: "login", component: IniciarSesionComponent },
  { path: "turno", component: RegistrarTurnoComponent },
  { path: "listaturno", component: ListadoTurnosComponent },
  { path: "empleado", component: EmpleadoComponent },
  { path: "listaempleado", component: ListadoEmpleadosComponent },
  { path: "modificarempleado/:id", component: ModificarEmpleadoComponent },
  { path: "registrarempleado", component: RegistrarComponent },
  { path: "registrarUsuario", component: RegistrarUsuarioComponent },
  { path: "modificarusuario", component: ModificarUsuarioComponent },
  { path: "eliminarusuario", component: EliminarUsuarioComponent },
  { path: "marca", component: RegistrarMarcaComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
