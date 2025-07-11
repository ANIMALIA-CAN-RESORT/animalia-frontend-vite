import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from 'src/app/mascotas/models/mascota';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente-mascotas',
  templateUrl: './cliente-mascotas.component.html',
  styles: []
})
export class ClienteMascotasComponent implements OnInit {
  mascotas: Mascota[];
  constructor(
    private activateRoute: ActivatedRoute,
    private clienteService: ClienteService) { }
 
    ngOnInit(): void {
      this.clienteService.getMascotasIdCliente(this.activateRoute.snapshot.params['id']).subscribe((response) => this.mascotas = this.clienteService.extraerMascotasCliente(response));
    console.log(this.mascotas);
    }
}
