import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioImpl } from '../../models/usuario-impl';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioVerDatos: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((response) => this.usuarios = this.usuarioService.extraerUsuarios(response));
  }

  verDatos(usuario: Usuario): void {
    this.usuarioVerDatos = usuario;
  }

  onUsuarioEliminar(usuario: UsuarioImpl): void {
    this.usuarioService.delete(usuario).subscribe(response => {
      console.log(`He borrado a ${usuario.nombre}`);
      this.router.navigate(['/administracion']);
    });
  }

  onUsuarioEditar(usuario: UsuarioImpl): void {
    this.usuarioService.update(usuario).subscribe(response => {
      console.log(`He actualizado a ${usuario.nombre}`);
      this.router.navigate(['/administracion']);
    });
  }
}
