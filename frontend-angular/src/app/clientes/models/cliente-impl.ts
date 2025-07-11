import { Mascota } from "src/app/mascotas/models/mascota";
import { Cliente } from "./cliente";

export class ClienteImpl implements Cliente {

  id: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  dni: string;
  tfno: string;
  email: string;
  mascotas: Mascota[];
  url: string;

  constructor(){}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
