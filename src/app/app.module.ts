import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RegistrarTurnoComponent } from './Turno/registrar-turno/registrar-turno.component';
import { PrincipalComponent } from './inicio/principal/principal.component';
import { IniciarSesionComponent } from './inicio/iniciar-sesion/iniciar-sesion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatNativeDateModule} from '@angular/material/core';
import { EmpleadoComponent } from './inicio/empleado/empleado.component';
import { RegistrarComponent } from './empleado/registrar/registrar.component';
import { RegistrarUsuarioComponent } from './Usuario/registrar-usuario/registrar-usuario.component';
import { ListadoTurnosComponent } from './Turno/listado-turnos/listado-turnos.component';
import { ListadoEmpleadosComponent } from './empleado/listado-empleados/listado-empleados.component';
import {MatIconModule} from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './navbar/navbar.component';
import { ModificarUsuarioComponent } from './Usuario/modificar-usuario/modificar-usuario.component';
import { EliminarUsuarioComponent } from './Usuario/eliminar-usuario/eliminar-usuario.component';
import { EmpleadosPipe } from './pipes/empleados.pipe';
import { ModificarEmpleadoComponent } from './empleado/modificar-empleado/modificar-empleado.component';
import { TurnoPipe } from './pipes/turno.pipe';
import { RegistrarMarcaComponent } from './marca/registrar-marca/registrar-marca.component';
import { InsumosComponent } from './insumos/insumos/insumos.component';
import { ListadoInsumosComponent } from './insumos/listado-insumos/listado-insumos.component';
import { RegistrarIngresoComponent } from './ingresos/registrar-ingreso/registrar-ingreso.component';
import { ListadoIngresosComponent } from './ingresos/listado-ingresos/listado-ingresos.component';
import { FiltroingresoPipe } from './pipes/filtroingreso.pipe';
import { IngresoconfirmadoPipe } from './pipes/ingresoconfirmado.pipe';
import { PanelEmpleadoComponent } from './inicio/panel-empleado/panel-empleado.component';
import { LogeadoGuard } from './guards/logeado.guard';
import { PanelServicioComponent } from './servicios/panel-servicio/panel-servicio.component';
import { GenerarOrdenComponent } from './caja/generar-orden/generar-orden.component';
import { FooterComponent } from './footer/footer/footer.component';
import { TerminosComponent } from './extras/terminos/terminos.component';
import { PreguntasComponent } from './extras/preguntas/preguntas.component';
import { AgregarEgresoComponent } from './caja/agregar-egreso/agregar-egreso.component';
import { AgregarDepositoComponent } from './caja/agregar-deposito/agregar-deposito.component';
import { ListadoGastosComponent } from './administracion/listado-gastos/listado-gastos.component';
import { ListadoDepositosComponent } from './administracion/listado-depositos/listado-depositos.component';
import { ModificarEgresoComponent } from './administracion/modificar-egreso/modificar-egreso.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { ListadoOrdenesComponent } from './caja/listado-ordenes/listado-ordenes.component';
import { PrecioPipe } from './pipes/precio.pipe';
import { IngresopagadoPipe } from './pipes/ingresopagado.pipe';
import { OrdenfiltroborradaPipe } from './pipes/ordenfiltroborrada.pipe';
import { ListadoGrabarComponent } from './grabado/listado-grabar/listado-grabar.component';
import { RegistrarGrabadoComponent } from './grabado/registrar-grabado/registrar-grabado.component';
import { DetallePorGrabarPipe } from './pipes/detalle-por-grabar.pipe';
import { DetallePorGrabarCristalesPipe } from './pipes/detalle-por-grabar-cristales.pipe';
import { RegistrarGrabadoCristalesComponent } from './grabado/registrar-grabado-cristales/registrar-grabado-cristales.component';
import { FiltroGrabadoNoBorradoPipe } from './pipes/filtro-grabado-no-borrado.pipe';
import { AgregarFormularioComponent } from './formulario/agregar-formulario/agregar-formulario.component';
import { ListadoFormulariosComponent } from './formulario/listado-formularios/listado-formularios.component';
import { FiltroRegistrarFormularioPipe } from './pipes/filtro-registrar-formulario.pipe';
import { FiltroListadoFormulariosPipe } from './pipes/filtro-listado-formularios.pipe';
import { FiltroOrdenesPipe } from './pipes/filtro-ordenes.pipe';
import { FiltroParaOrdenarPipe } from './pipes/filtro-para-ordenar.pipe';
import { FiltroTurnosPipe } from './pipes/filtro-turnos.pipe';
import { ListadoPorUsuarioComponent } from './Usuario/listado-por-usuario/listado-por-usuario.component';
import { FiltroporusuarioPipe } from './pipes/filtroporusuario.pipe';
import { FiltroEmpleadosPipe } from './pipes/filtro-empleados.pipe';
import { FiltroInsumosPipe } from './pipes/filtro-insumos.pipe';
import { InformeCajaComponent } from './caja/informe-caja/informe-caja.component';
import { FiltroagregarordenPipe } from './pipes/filtroagregarorden.pipe';
import { VehiculograbadoPipe } from './pipes/vehiculograbado.pipe';
import { GastosPipe } from './pipes/gastos.pipe';
import { AutopartesCristalesPipe } from './pipes/autopartes-cristales.pipe';
import { InformeInsumosComponent } from './informes/informe-insumos/informe-insumos.component';
import { InformeServiciosComponent } from './informes/informe-servicios/informe-servicios.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarTurnoComponent,
    PrincipalComponent,
    IniciarSesionComponent,
    EmpleadoComponent,
    RegistrarComponent,
    RegistrarUsuarioComponent,
    ListadoTurnosComponent,
    ListadoEmpleadosComponent,
    NavbarComponent,
    ModificarUsuarioComponent,
    EliminarUsuarioComponent,
    EmpleadosPipe,
    ModificarEmpleadoComponent,
    TurnoPipe,
    RegistrarMarcaComponent,
    InsumosComponent,
    ListadoInsumosComponent,
    RegistrarIngresoComponent,
    ListadoIngresosComponent,
    FiltroingresoPipe,
    IngresoconfirmadoPipe,
    PanelEmpleadoComponent,
    PanelServicioComponent,
    GenerarOrdenComponent,
    FooterComponent,
    TerminosComponent,
    PreguntasComponent,
    AgregarEgresoComponent,
    AgregarDepositoComponent,
    ListadoGastosComponent,
    ListadoDepositosComponent,
    ModificarEgresoComponent,
    FechaPipe,
    ListadoOrdenesComponent,
    PrecioPipe,
    IngresopagadoPipe,
    OrdenfiltroborradaPipe,
    ListadoGrabarComponent,
    RegistrarGrabadoComponent,
    DetallePorGrabarPipe,
    DetallePorGrabarCristalesPipe,
    RegistrarGrabadoCristalesComponent,
    FiltroGrabadoNoBorradoPipe,
    AgregarFormularioComponent,
    ListadoFormulariosComponent,
    FiltroRegistrarFormularioPipe,
    FiltroListadoFormulariosPipe,
    FiltroOrdenesPipe,
    FiltroParaOrdenarPipe,
    FiltroTurnosPipe,
    ListadoPorUsuarioComponent,
    FiltroporusuarioPipe,
    FiltroEmpleadosPipe,
    FiltroInsumosPipe,
    InformeCajaComponent,
    FiltroagregarordenPipe,
    VehiculograbadoPipe,
    GastosPipe,
    AutopartesCristalesPipe,
    InformeInsumosComponent,
    InformeServiciosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    NgxPaginationModule,
    HighchartsChartModule

  ],
  providers: [ DatePipe, LogeadoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
