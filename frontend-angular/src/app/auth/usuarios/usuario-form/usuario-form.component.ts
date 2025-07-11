import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioImpl } from '../../models/usuario-impl';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styles: [
  ]
})
export class UsuarioFormComponent implements OnInit {
  usuario: UsuarioImpl = new UsuarioImpl();

  constructor(private usuarioService: UsuarioService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  crearUsuario(): void {
    this.usuarioService.create(this.usuario).subscribe((response) => {
      console.log(`He creado a ${this.usuario.nombre}`);
      this.router.navigate(['/administracion']);
    });
  }
}
