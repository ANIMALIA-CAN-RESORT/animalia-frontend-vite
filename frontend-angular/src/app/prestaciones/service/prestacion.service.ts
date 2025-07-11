import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ClienteImpl } from 'src/app/clientes/models/cliente-impl';
import { Mascota } from 'src/app/mascotas/models/mascota';
import { MascotaImpl } from 'src/app/mascotas/models/mascota-impl';
import { environment } from 'src/environments/environment';
import { Prestacion } from '../models/prestacion';
import { PrestacionImpl } from '../models/prestacion-impl';


@Injectable({
  providedIn: 'root'
})
export class PrestacionService {

  private host: string = environment.urlHost;
  private urlEndPoint: string = `${this.host}prestaciones`;

  constructor(
    private http: HttpClient) { }

  getPrestaciones(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);//con lo ultimo le digo que me muestre 1000 prestaciones. sino saldria solo la primera pagina
  }

  extraerPrestaciones(respuestaApi: any): Prestacion[] {
    const prestaciones: Prestacion[] = [];
    if (respuestaApi._embedded.alimentaciones) {
      respuestaApi._embedded.alimentaciones.forEach(p => {
        prestaciones.push(this.mapearPrestacion(p));
      });
    }
    if (respuestaApi._embedded.alojamientos) {
      respuestaApi._embedded.alojamientos.forEach(p => {
        prestaciones.push(this.mapearPrestacion(p));
      });
    }
    return prestaciones;
  }

  mapearPrestacion(prestacionApi: any): PrestacionImpl {
    const prestacion = new PrestacionImpl();
    prestacion.tipo = prestacionApi.tipo;
    prestacion.fechaEntrada = prestacionApi.fechaEntrada;
    prestacion.fechaSalida = prestacionApi.fechaSalida;
    prestacion.tipoComida = prestacionApi.tipoComida ? prestacionApi.tipoComida : '';
    prestacion.cantidadComidaDiaria = prestacionApi.cantidadComidaDiaria ? prestacionApi.cantidadComidaDiaria : '';
    prestacion.pagada = prestacionApi.pagada;
    prestacion.jaula = prestacionApi.jaula ? prestacionApi.jaula : '';
    prestacion.precioPrestacion = prestacionApi.precioPrestacion;
    prestacion.precioDia = prestacionApi.precioDia;
    prestacion.url = prestacionApi._links.self.href;
    prestacion.id = prestacion.getId(prestacion.url);
    prestacion.tipo = prestacionApi.jaula ? 'Alojamiento' : 'Alimentacion';
    return prestacion;
  }

  createAlojamiento(prestacion: Prestacion): Observable<any> {
    return this.http.post(`${this.host}alojamientos`, prestacion).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  createAlimentacion(prestacion: Prestacion): Observable<any> {
    return this.http.post(`${this.host}alimentaciones`, prestacion).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  borrarAlojamiento(prestacion): Observable<Prestacion> {
    return this.http.delete<Prestacion>(`${this.host}alojamientos/${prestacion.id}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  borrarAlimentacion(prestacion): Observable<Prestacion> {
    return this.http.delete<Prestacion>(`${this.host}alimentaciones/${prestacion.id}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  update(prestacion: Prestacion): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${prestacion.id}`, prestacion)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  getPrestacion(id): Observable<any> {
    return this.http.get<Prestacion>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getMascotas(): Observable<any> {
    return this.http.get<any>(`${this.host}mascotas?page=0&size=1000`);//con lo ultimo le digo que me muestre 1000 mascotas. sino saldria solo la primera pagina
  }

  extraerMascotas(respuestaApi: any): Mascota[] {
    const mascotas: Mascota[] = [];
    respuestaApi._embedded.mascotas.forEach(m => {
      mascotas.push(this.mapearMascota(m));
    });
    return mascotas;
  }

  mapearMascota(mascotaApi: any): MascotaImpl {
    const mascota = new MascotaImpl();
    mascota.nombre = mascotaApi.nombre;
    mascota.raza = mascotaApi.raza;
    mascota.talla = mascotaApi.talla;
    mascota.chip = mascotaApi.chip;
    mascota.url = mascotaApi._links.self.href;
    mascota.id = mascota.getId(mascota.url);
    return mascota;
  }

  getMascota(prestacion: Prestacion): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${prestacion.id}/mascota`);
  }

  getMascotaId(id): Observable<any> {
    return this.http.get<Mascota>(`${this.host}mascotas/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getPrestacionesDeMascota(mascota: Mascota): Observable<any> {
    return this.http.get<any>(`${this.host}mascotas/${mascota.id}/prestaciones?page=0&size=1000`);
  }

  getPrestacionesIdMascota(id: string): Observable<any> {
    return this.http.get<any>(`${this.host}mascotas/${id}/prestaciones?page=0&size=1000`);
  }

  getPrestacionesPagadas(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/pagadas?page=0&size=1000`);
  }

  getPrestacionesNoPagadas(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/no-pagadas?page=0&size=1000`);
  }

  getPrestacionesPagadasDeMascota(mascota: Mascota): Observable<any> {
    return this.http.get<any>(`${this.host}mascotas/${mascota.id}/prestaciones/pagadas?page=0&size=1000`);
  }

  getPrestacionesNoPagadasDeMascota(mascota: Mascota): Observable<any> {
    return this.http.get<any>(`${this.host}mascotas/${mascota.id}/prestaciones/no-pagadas?page=0&size=1000`);
  }

  getPrestacionesNoPagadasDeMascotaPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.host}mascotas/${id}/prestaciones/no-pagadas?page=0&size=1000`);
  }

  generarFacturaDeMascota(mascota: Mascota): Observable<any> {
    return this.http.get<any>(`${this.host}mascotas/${mascota.id}/prestaciones/no-pagadas/factura`);
  }

  getCliente(id: string): Observable<any> {
    return this.http.get<any>(`${this.host}mascotas/${id}/cliente`);
  }

  mapearCliente(clienteApi: any): Cliente {
    const cliente = new ClienteImpl();
    cliente.nombre = clienteApi.nombre;
    cliente.apellido1 = clienteApi.apellido1;
    cliente.apellido2 = clienteApi.apellido2;
    cliente.tfno = clienteApi.tfno;
    cliente.email = clienteApi.email;
    cliente.dni = clienteApi.dni;
    cliente.url = clienteApi._links.self.href;
    cliente.id = cliente.getId(cliente.url);

    return cliente;
  }
}
