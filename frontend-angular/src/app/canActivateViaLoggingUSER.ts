import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './core/shell/header/header.component';

@Injectable()
export class CanActivateViaLoggingUSER {

    constructor(private router: Router) { }

    canActivateChild() {
        // si el usuario no está loggeado le dará un alert y le llevará a "/"
        if (!HeaderComponent.userLoginOn) {
            this.router.navigate(['/']);
            HeaderComponent.alertLogging();
            return false;
        }

        return true;
    }
}