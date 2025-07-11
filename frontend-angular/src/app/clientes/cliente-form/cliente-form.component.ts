import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteImpl } from '../models/cliente-impl';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styles: [
  ]
})
export class ClienteFormComponent implements OnInit {
  cliente: ClienteImpl = new ClienteImpl();

  constructor(private clienteService: ClienteService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  crearCliente(): void {
    this.clienteService.create(this.cliente).subscribe((response) => {
      console.log(`He creado a ${this.cliente.nombre}`);
      this.router.navigate(['/clientes']);
    });
  }
}
