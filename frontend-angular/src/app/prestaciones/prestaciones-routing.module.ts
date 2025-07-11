import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './factura/factura.component';
import { PrestacionFormComponent } from './prestacion-form/prestacion-form.component';
import { PrestacionesComponent } from './prestaciones/prestaciones.component';

const routes: Routes = [
  {
    path: '',
    component: PrestacionesComponent
  },
  {
    path: 'formulario',
    component: PrestacionFormComponent
  },
  {
    path: 'facturas/:id',
    component: FacturaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestacionesRoutingModule { }
