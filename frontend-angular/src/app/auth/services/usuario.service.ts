import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { UsuarioImpl } from '../models/usuario-impl';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private host: string = environment.urlHost;
  private urlEndPoint: string = `${this.host}usuarios`;
  private urlRegister: string = `${this.host}auth/register`;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  extraerUsuarios(respuestaApi: any): Usuario[] {
    const usuarios: Usuario[] = [];
    respuestaApi._embedded.usuarios.forEach(u => {
      usuarios.push(this.mapearUsuario(u));

    });
    return usuarios;
  }

  mapearUsuario(usuarioApi: any): UsuarioImpl {
    const usuario = new UsuarioImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.apellido = usuarioApi.apellido;
    usuario.pais = usuarioApi.pais;
    usuario.username = usuarioApi.username;
    usuario.rol = usuarioApi.rol;
    usuario.url = usuarioApi._links.self.href;
    usuario.id = usuario.getId(usuario.url);

    return usuario;
  }

  create(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.urlRegister}`, usuario).pipe(
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

  delete(usuario): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${usuario.id}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  update(usuario: Usuario): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario)
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
  // updateUser(userRequest: Usuario): Observable<any> {
  //   console.log("quiero actualizar a " + userRequest.id);
  //   return this.http
  //     .patch<any>(`${environment.urlHost}usuarios/${userRequest.id}`, userRequest)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }
  getUsuario(id): Observable<any> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getUsuarioPorUsername(username: string): Observable<any> {
    return this.http.get<Usuario>(this.urlEndPoint + "/search/findByUsername?username=" + username).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    }
    else {
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

}
