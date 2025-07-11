import { Mascota } from "src/app/mascotas/models/mascota";

export interface Prestacion {

  id: string;
  fechaEntrada: Date | string;
  fechaSalida: Date | string;
  pagada: boolean;
  tipoComida?: string;
  cantidadComidaDiaria?: number;
  jaula?: string;
  mascota: Mascota;
  url: string;
  tipo: string;
  precioDia: number;
  precioPrestacion: number;

}
