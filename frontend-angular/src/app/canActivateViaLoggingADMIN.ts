import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './core/shell/header/header.component';

@Injectable()
export class CanActivateViaLoggingADMIN {

    constructor(private router: Router) { }

    canActivateChild() {
        // si el usuario no está loggeado como administrador le dará un alert y le llevará a "/"
        if (!HeaderComponent.userloggedAdmin) {
            this.router.navigate(['/']);
            HeaderComponent.alertLoggingAdmin();
            return false;
        }

        return true;
    }
}