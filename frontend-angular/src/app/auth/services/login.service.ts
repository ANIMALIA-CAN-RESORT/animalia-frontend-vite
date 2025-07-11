import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/loginRequest';
import { catchError, map, tap } from 'rxjs/operators';
import { HeaderComponent } from 'src/app/core/shell/header/header.component';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserRol: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserToken: BehaviorSubject<String> = new BehaviorSubject<String>("");//nos devuelve el token
  currentUsernameLogged: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentIdUserLogged: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
    this.currentUserAdmin = new BehaviorSubject<boolean>(sessionStorage.getItem("rolUsuario") === "ADMIN");
    this.currentUserToken = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    this.currentUsernameLogged = new BehaviorSubject<String>(sessionStorage.getItem("currentUsername") || "");
    this.currentIdUserLogged = new BehaviorSubject<String>(sessionStorage.getItem("idUser") || "");
    this.currentUserRol = new BehaviorSubject<String>(sessionStorage.getItem("rolUsuario") || "");
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(environment.urlHost + "auth/login", credentials).pipe(
      tap((userData) => {

        sessionStorage.setItem("token", userData.token);//guardo el token en el sessionstorage
        sessionStorage.setItem("currentUsername", userData.username);//guardo el username en el sessionstorage
        this.currentUserToken.next(userData.token);//seteo las variables
        this.currentUsernameLogged.next(userData.username);
        this.currentUserLoginOn.next(true);
        this.currentUserRol.next(sessionStorage.getItem("rolUsuario"));
        this.currentUserAdmin.next(sessionStorage.getItem("rolUsuario") === "ADMIN");
        this.currentIdUserLogged.next(sessionStorage.getItem("idUser"));
        console.log("el id del usuario loggeado es " + sessionStorage.getItem("idUser"));
        console.log("el rol del usuario loggeado es " + sessionStorage.getItem("rolUsuario"));

      }),
      tap((userData) => {
        this.usuarioService.getUsuarioPorUsername(credentials.username).subscribe(response => {
          this.currentIdUserLogged.next((response._links.self.href).slice((response._links.self.href).lastIndexOf('/') + 1, (response._links.self.href).length));
          sessionStorage.setItem("idUser", (response._links.self.href).slice((response._links.self.href).lastIndexOf('/') + 1, (response._links.self.href).length));//guardo el id en el sessionstorage
          console.log("el id del usuario loggeado es " + sessionStorage.getItem("idUser"));
          sessionStorage.setItem("rolUsuario", response.rol);//guardo el rol en el sessionstorage
          HeaderComponent.userloggedAdmin = sessionStorage.getItem("rolUsuario") === "ADMIN";

        });
      }

      ),
      map((userData) => userData.token),//para que en vez de devolverme un json me devuelva el token...
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("currentUsername");
    sessionStorage.removeItem("idUser");
    sessionStorage.removeItem("rolUsuario");
    this.currentUserLoginOn.next(false);
    this.currentIdUserLogged.next("");
    this.currentUsernameLogged.next("");
    this.currentUserToken.next("");
    this.currentUserRol.next("");
    HeaderComponent.userloggedAdmin = false;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    }
    else {
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData(): Observable<String> {
    return this.currentUserToken.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserToken.value;
  }

  get currentUsername(): String {
    return this.currentUsernameLogged.value;
  }

  get currentIdUser(): String {
    return this.currentIdUserLogged.value;
  }
}
