import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/clientes/models/cliente';
import { MascotaImpl } from '../models/mascota-impl';
import { MascotaService } from '../service/mascota.service';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styles: [
  ]
})
export class MascotaFormComponent implements OnInit {
  mascota: MascotaImpl = new MascotaImpl();
  clientes: Cliente[];

  constructor(private mascotaService: MascotaService, 
    private router: Router) { }

  ngOnInit(): void {
    this.mascotaService.getClientes().subscribe((response) => this.clientes = this.mascotaService.extraerClientes(response));

  }

  crearMascota(): void {
    this.mascotaService.create(this.mascota).subscribe((response) => {
      console.log(`He creado a ${this.mascota.nombre}`);
      this.router.navigate(['/mascotas']);
    });
  }

  cargarCliente() {
    this.mascota.cliente = this.clientes.filter((c) => c === this.mascota.cliente)[0];
  }
}
