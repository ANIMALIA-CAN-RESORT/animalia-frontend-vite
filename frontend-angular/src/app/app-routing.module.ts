import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component'
import { LoginComponent } from './auth/login/login.component';
import { CanActivateViaLoggingUSER } from './canActivateViaLoggingUSER';
import { CanActivateViaLoggingADMIN } from './canActivateViaLoggingADMIN';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),
    canActivateChild: [CanActivateViaLoggingUSER]
  },
  {
    path: 'mascotas',
    loadChildren: () => import('./mascotas/mascotas.module').then(m => m.MascotasModule),
    canActivateChild: [CanActivateViaLoggingUSER]
  },
  {
    path: 'prestaciones',
    loadChildren: () => import('./prestaciones/prestaciones.module').then(m => m.PrestacionesModule),
    canActivateChild: [CanActivateViaLoggingUSER]
  },
  {
    path: 'administracion',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    , canActivateChild: [CanActivateViaLoggingADMIN]
  },
  {
    path: 'iniciar-sesion',
    component: LoginComponent  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
