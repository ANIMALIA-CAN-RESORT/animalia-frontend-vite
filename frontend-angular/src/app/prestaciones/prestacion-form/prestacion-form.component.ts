import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/mascotas/models/mascota';
import { PrestacionImpl } from '../models/prestacion-impl';
import { PrestacionService } from '../service/prestacion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-prestacion-form',
  templateUrl: './prestacion-form.component.html',
  styles: [
  ]
})
export class PrestacionFormComponent implements OnInit {
  prestacion: PrestacionImpl = new PrestacionImpl();
  mascotas: Mascota[];
  jaulas: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

  constructor(private prestacionService: PrestacionService,
    private router: Router) { }

  ngOnInit(): void {
    this.prestacion.tipo = 'Alojamiento';
    this.prestacionService.getMascotas().subscribe((response) => this.mascotas = this.prestacionService.extraerMascotas(response));
  }

  crearPrestacion(): void {
    this.prestacion.fechaEntrada = moment(this.prestacion.fechaEntrada).format().slice(0, moment(this.prestacion.fechaEntrada).format().lastIndexOf('+')).concat("Z");
    this.prestacion.fechaSalida = moment(this.prestacion.fechaSalida).format().slice(0, moment(this.prestacion.fechaSalida).format().lastIndexOf('+')).concat("Z");
    if (this.prestacion.tipo == 'Alojamiento') {
      this.prestacionService.createAlojamiento(this.prestacion).subscribe((response) => {
        console.log(`He creado un ${this.prestacion.tipo}`);
        this.router.navigate(['/prestaciones']);
      });
    } else if (this.prestacion.tipo == 'Alimentacion') {
      this.prestacionService.createAlojamiento(this.prestacion).subscribe((response) => {
        console.log('He creado un alojamiento');
      });
      this.prestacionService.createAlimentacion(this.prestacion).subscribe((response) => {
        console.log(`He creado un ${this.prestacion.tipo}`);
        this.router.navigate(['/prestaciones']);
      });
    }
  }
}
