import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../service/cliente.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})
export class ClienteComponent implements OnInit {
  faEdit = faEdit;
  @Input() cliente: Cliente;
  @Output() clienteSeleccionado = new EventEmitter<Cliente>();

  constructor() { }

  ngOnInit(): void {

  }

}
