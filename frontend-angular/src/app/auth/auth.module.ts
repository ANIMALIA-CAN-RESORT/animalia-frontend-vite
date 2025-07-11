import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { AuthRoutingModule } from './auth-routing.module';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { UsuarioFichaComponent } from './usuarios/usuarios/usuario-ficha/usuario-ficha.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [LoginComponent, UsuariosComponent, UsuarioFichaComponent, UsuarioFormComponent, UsuarioComponent], 
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule, 
    FontAwesomeModule
  ],
    providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ]
})
export class AuthModule { }
