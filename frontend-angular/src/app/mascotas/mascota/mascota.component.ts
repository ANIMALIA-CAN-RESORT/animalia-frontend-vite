import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClienteImpl } from 'src/app/clientes/models/cliente-impl';
import { Mascota } from '../models/mascota';
import { MascotaService } from '../service/mascota.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styles: [
  ]
})
export class MascotaComponent implements OnInit {
  faEdit =faEdit;
  @Input() mascota: Mascota;
  @Output() mascotaSeleccionada = new EventEmitter<Mascota>();

  constructor(private mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.mascotaService.getCliente(this.mascota).subscribe((response) => this.mascota.cliente = this.mascotaService.mapearCliente(response));

  }

}
