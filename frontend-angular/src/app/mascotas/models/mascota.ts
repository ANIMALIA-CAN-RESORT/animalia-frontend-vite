import { Cliente } from "src/app/clientes/models/cliente";
import { PrestacionImpl } from "src/app/prestaciones/models/prestacion-impl";

export interface Mascota {

  id: string;
  nombre: string;
  raza: string;
  talla: string;
  chip: string;
  prestaciones: PrestacionImpl[];
  cliente: Cliente;
  url: string;




}
