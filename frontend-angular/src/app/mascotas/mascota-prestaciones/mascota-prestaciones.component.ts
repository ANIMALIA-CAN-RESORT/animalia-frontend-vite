import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestacionImpl } from 'src/app/prestaciones/models/prestacion-impl';
import { MascotaService } from '../service/mascota.service';

@Component({
  selector: 'app-mascota-prestaciones',
  templateUrl: './mascota-prestaciones.component.html',
  styles: []
})
export class MascotaPrestacionesComponent implements OnInit {
  prestaciones: PrestacionImpl[] = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private mascotaService: MascotaService) { }
 
    ngOnInit(): void {
      this.mascotaService.getPrestacionesIdMascota(this.activateRoute.snapshot.params['id']).subscribe((response) => this.prestaciones = this.mascotaService.extraerPrestacionesMascota(response));

    }
}
