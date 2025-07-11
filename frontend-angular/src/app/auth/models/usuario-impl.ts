import { Usuario } from "./usuario";

export class UsuarioImpl implements Usuario {

  id:number | string;
  nombre: string;
  apellido: string;
  username: string;
  pais: string;
  password: string;
  rol: string;
  url?: string;

  constructor(){}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
