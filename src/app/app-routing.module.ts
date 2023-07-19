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
import { InsumosComponent } from './insumos/insumos/insumos.component';
import { ListadoInsumosComponent } from './insumos/listado-insumos/listado-insumos.component';
import { RegistrarIngresoComponent } from './ingresos/registrar-ingreso/registrar-ingreso.component';
import { ListadoIngresosComponent } from './ingresos/listado-ingresos/listado-ingresos.component';
import { LogeadoGuard } from './guards/logeado.guard';
import { PanelServicioComponent } from './servicios/panel-servicio/panel-servicio.component';
import { GenerarOrdenComponent } from './caja/generar-orden/generar-orden.component';
import { TerminosComponent } from './extras/terminos/terminos.component';
import { PreguntasComponent } from './extras/preguntas/preguntas.component';
import { AgregarEgresoComponent } from './caja/agregar-egreso/agregar-egreso.component';
import { AgregarDepositoComponent } from './caja/agregar-deposito/agregar-deposito.component';
import { ListadoGastosComponent } from './administracion/listado-gastos/listado-gastos.component';
import { ListadoDepositosComponent } from './administracion/listado-depositos/listado-depositos.component';
import { ModificarEgresoComponent } from './administracion/modificar-egreso/modificar-egreso.component';
import { ListadoOrdenesComponent } from './caja/listado-ordenes/listado-ordenes.component';
import { RegistrarGrabadoComponent } from './grabado/registrar-grabado/registrar-grabado.component';
import { ListadoGrabarComponent } from './grabado/listado-grabar/listado-grabar.component';
import { RegistrarGrabadoCristalesComponent } from './grabado/registrar-grabado-cristales/registrar-grabado-cristales.component';
import { AgregarFormularioComponent } from './formulario/agregar-formulario/agregar-formulario.component';
import { ListadoFormulariosComponent } from './formulario/listado-formularios/listado-formularios.component';
import { ListadoPorUsuarioComponent } from './Usuario/listado-por-usuario/listado-por-usuario.component';
import { InformeCajaComponent } from './caja/informe-caja/informe-caja.component';
import { InformeServiciosComponent } from './informes/informe-servicios/informe-servicios.component';
import { InformeInsumosComponent } from './informes/informe-insumos/informe-insumos.component';


const routes: Routes = [
  { path: "", component: PrincipalComponent },
  { path: "login", component: IniciarSesionComponent },
  { path: "turno", component: RegistrarTurnoComponent },
  { path: "listaturno", component: ListadoTurnosComponent },
  { path: "empleado", component: EmpleadoComponent },
  { path: "listaempleado", component: ListadoEmpleadosComponent, canMatch: [LogeadoGuard] },
  { path: "modificarempleado", component: ModificarEmpleadoComponent },
  { path: "registrarempleado", component: RegistrarComponent },
  { path: "registrarUsuario", component: RegistrarUsuarioComponent },
  { path: "modificarusuario", component: ModificarUsuarioComponent },
  { path: "eliminarusuario", component: EliminarUsuarioComponent },
  { path: "marca", component: RegistrarMarcaComponent },
  { path: "insumos", component: InsumosComponent },
  { path: "listadoinsumos", component: ListadoInsumosComponent },
  { path: "ingreso", component: RegistrarIngresoComponent },
  { path: "listadoingreso", component: ListadoIngresosComponent },
  { path: "servicios", component: PanelServicioComponent },
  { path: "generarOrden", component: GenerarOrdenComponent },
  { path: "terminos", component: TerminosComponent },
  { path: "preguntas", component: PreguntasComponent },
  { path: "agregarEgreso", component: AgregarEgresoComponent },
  { path: "agregarDeposito", component: AgregarDepositoComponent },
  { path: "listadoDepositos", component: ListadoDepositosComponent },
  { path: "listadoEgresos", component: ListadoGastosComponent },
  { path: "modificarEgresos/:id", component: ModificarEgresoComponent },
  { path: "listadoOrdenes", component: ListadoOrdenesComponent },
  { path: "RegistrarGrabado", component: RegistrarGrabadoComponent },
  { path: "ListadoGrabados", component: ListadoGrabarComponent },
  { path: "RegistrarGrabadoCristales", component: RegistrarGrabadoCristalesComponent },
  { path: "agregarFormulario", component: AgregarFormularioComponent },
  { path: "listadoFormularios", component: ListadoFormulariosComponent },
  { path: "listadoUsuario", component: ListadoPorUsuarioComponent },
  { path: "informedecaja", component: InformeCajaComponent },
  { path: "informeInsumos", component: InformeInsumosComponent },
  { path: "informeServicios", component: InformeServiciosComponent }






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
