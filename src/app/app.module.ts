import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { InformacionComponent } from './informacion/informacion.component';
import { PropuestasComponent } from './propuestas/propuestas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { InicioAdminComponent } from './inicio-admin/inicio-admin.component';
import { PropuestasAdminComponent } from './propuestas-admin/propuestas-admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { DatosService } from './datos.service';
import { SeguridadGuard } from './seguridad.guard';

const rutas: Route[] = [
  {path:'', component: InicioComponent},
  {path:'quien-soy', component: InformacionComponent},
  {path:'propuestas', component: PropuestasComponent},
  {path:'contacto', component: ContactoComponent},
  {path:'inicio', component: InicioComponent},
  {path:'inicioSesion', component: LoginComponent},
  {path:'usuarios', component: UsuariosComponent, canActivate: [SeguridadGuard]},
  {path:'propuestasAd', component: PropuestasAdminComponent, canActivate: [SeguridadGuard]},
  {path:'mensajes', component: MensajesComponent, canActivate: [SeguridadGuard]},
  {path:'inicioAd', component: InicioAdminComponent, canActivate: [SeguridadGuard]},
  {path:'*', component: InicioComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    InformacionComponent,
    PropuestasComponent,
    ContactoComponent,
    LoginComponent,
    InicioAdminComponent,
    PropuestasAdminComponent,
    UsuariosComponent,
    MensajesComponent,
    MenuAdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
