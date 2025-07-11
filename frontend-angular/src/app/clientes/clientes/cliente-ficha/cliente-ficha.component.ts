import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClienteImpl } from '../../models/cliente-impl';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-cliente-ficha',
  templateUrl: './cliente-ficha.component.html',
  styles: [
  ]
})
export class ClienteFichaComponent implements OnInit {
  @Input() cliente: ClienteImpl;
  @Output() clienteEliminar = new EventEmitter<ClienteImpl>();
  @Output() clienteEditar = new EventEmitter<ClienteImpl>();

  constructor() { }

  ngOnInit(): void {

  }
  eliminar(): void {
    this.clienteEliminar.emit(this.cliente);
  }

  editar(): void {
    this.clienteEditar.emit(this.cliente);
  }
}
