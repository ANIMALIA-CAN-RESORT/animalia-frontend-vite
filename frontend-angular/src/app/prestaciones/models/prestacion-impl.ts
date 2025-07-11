import { Mascota } from "src/app/mascotas/models/mascota";
import { MascotaImpl } from "src/app/mascotas/models/mascota-impl";
import { Prestacion } from "./prestacion";

export class PrestacionImpl implements Prestacion {

  id: string;
  fechaEntrada: Date | string;
  fechaSalida: Date | string;
  pagada: boolean;
  tipoComida?: string;
  cantidadComidaDiaria?: number;
  jaula?: string;
  mascota: MascotaImpl;
  url: string;
  tipo: string;
  precioDia: number;
  precioPrestacion: number;

  constructor(){
  }
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
