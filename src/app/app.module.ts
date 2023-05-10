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
    NgxPaginationModule

  ],
  providers: [ DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
