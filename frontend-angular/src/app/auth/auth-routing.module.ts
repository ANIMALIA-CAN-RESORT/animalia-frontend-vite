import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';

const routes: Routes = [
  {
    path:'',
    component: UsuariosComponent
  },
  {
    path: 'formulario',
    component: UsuarioFormComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
