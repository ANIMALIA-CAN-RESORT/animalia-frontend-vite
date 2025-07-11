import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { ClienteImpl } from '../models/cliente-impl';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private host: string = environment.urlHost;
  private urlEndPoint: string = `${this.host}clientes`;

  constructor(
    private http: HttpClient) { }

  getMascotasIdCliente(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}/mascotas?page=0&size=1000`);
  }
  getMascotasCliente(cliente): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${cliente.id}/mascotas?page=0&size=1000`);
  }

  extraerMascotasCliente(respuestaApi: any): any[] {
    const mascotas: any[] = [];
    if (respuestaApi._embedded.mascotas) {
      respuestaApi._embedded.mascotas.forEach(m => {
        mascotas.push(m);

      });
    }
    return mascotas;
  }
  getClientes(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  extraerClientes(respuestaApi: any): Cliente[] {
    const clientes: Cliente[] = [];
    respuestaApi._embedded.clientes.forEach(c => {
      clientes.push(this.mapearCliente(c));

    });
    return clientes;
  }

  mapearCliente(clienteApi: any): ClienteImpl {
    const cliente = new ClienteImpl();
    cliente.nombre = clienteApi.nombre;
    cliente.apellido1 = clienteApi.apellido1;
    cliente.apellido2 = clienteApi.apellido2;
    cliente.dni = clienteApi.dni;
    cliente.tfno = clienteApi.tfno;
    cliente.email = clienteApi.email;
    cliente.url = clienteApi._links.self.href;
    cliente.id = cliente.getId(cliente.url);

    return cliente;
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, cliente).pipe(
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

  delete(cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${cliente.id}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente)
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

  getCliente(id): Observable<any> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
