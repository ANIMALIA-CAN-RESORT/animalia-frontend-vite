import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { faAddressBook, faBed, faBone, faBook, faDog, faUser, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser =faUser;
  faBook = faBook;
  faAddressBook = faAddressBook;
  faDotCircle = faDotCircle;
  faDog = faDog;
  faBed = faBed;
  faBone = faBone;
  faUsersCog = faUsersCog;
  static userLoginOn: boolean = false;
  static userloggedAdmin: boolean = false;
  userNameLogged: String;
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          HeaderComponent.userLoginOn=userLoginOn;
        }
      }
    );
    this.loginService.currentUsernameLogged.subscribe(
      {
        next:(username) => {
          this.userNameLogged=username;
        }
      }
    );
    this.loginService.currentUserRol.subscribe(
      {
        next:(rol) => {
          console.log(rol);
        }
      }

    );
  }
  static alertLogging() {
    alert("Debes iniciar sesión para acceder al listado")
  }
  static alertLoggingAdmin() {
    alert("Debes iniciar sesión como administrador para acceder a esta sección")
  }
  logout()
  {
    this.loginService.logout();
    this.router.navigate(['/'])
  }
  isAdmin() {
   return HeaderComponent.userloggedAdmin;
  }
  getUserLoggingOn() {
    return HeaderComponent.userLoginOn;
  }
}
