import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioImpl } from 'src/app/auth/models/usuario-impl';

@Component({
  selector: 'app-usuario-ficha',
  templateUrl: './usuario-ficha.component.html',
  styles: [
  ]
})
export class UsuarioFichaComponent implements OnInit {
  @Input() usuario: UsuarioImpl;
  @Output() usuarioEliminar = new EventEmitter<UsuarioImpl>();
  @Output() usuarioEditar = new EventEmitter<UsuarioImpl>();

  constructor() { }

  ngOnInit(): void {

  }
  eliminar(): void {
    this.usuarioEliminar.emit(this.usuario);
  }

  editar(): void {
    this.usuarioEditar.emit(this.usuario);
  }
}
