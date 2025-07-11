import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MascotasRoutingModule } from './mascotas-routing.module';
import { MascotasComponent } from './mascotas/mascotas.component';
import { MascotaComponent } from './mascota/mascota.component';
import { MascotaFichaComponent } from './mascotas/mascota-ficha/mascota-ficha.component';
import { MascotaFormComponent } from './mascota-form/mascota-form.component';
import { MascotaPrestacionesComponent } from './mascota-prestaciones/mascota-prestaciones.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [MascotasComponent, MascotaFichaComponent, MascotaFormComponent, MascotaComponent, MascotaPrestacionesComponent],
  imports: [
    CommonModule,
    MascotasRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class MascotasModule { }
