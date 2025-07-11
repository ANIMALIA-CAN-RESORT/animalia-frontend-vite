import { Cliente } from "src/app/clientes/models/cliente";
import { PrestacionImpl } from "src/app/prestaciones/models/prestacion-impl";
import { Mascota } from "./mascota";

export class MascotaImpl implements Mascota {

  id: string;
  nombre: string;
  raza: string;
  talla: string;
  chip: string;
  prestaciones: PrestacionImpl[];
  cliente: Cliente;
  url: string;

  constructor(){}
  
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }

}
