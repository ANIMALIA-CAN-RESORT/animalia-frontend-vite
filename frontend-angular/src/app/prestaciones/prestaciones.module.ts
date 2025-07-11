import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestacionesComponent } from './prestaciones/prestaciones.component';
import { PrestacionFichaComponent } from './prestaciones/prestacion-ficha/prestacion-ficha.component';
import { PrestacionComponent } from './prestacion/prestacion.component';
import { PrestacionesRoutingModule } from './prestaciones-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrestacionFormComponent } from './prestacion-form/prestacion-form.component';
import { FacturaComponent } from './factura/factura.component';

@NgModule({
  declarations: [PrestacionesComponent, PrestacionFichaComponent, PrestacionFormComponent, PrestacionComponent, FacturaComponent],
  imports: [
    CommonModule,
    PrestacionesRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class PrestacionesModule { }
