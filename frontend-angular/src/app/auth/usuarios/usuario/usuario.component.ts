import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {
  faEdit =faEdit;
  @Input() usuario: Usuario;
  @Output() usuarioSeleccionado = new EventEmitter<Usuario>();

  constructor() { }

  ngOnInit(): void {

  }

}
