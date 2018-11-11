import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(private router: Router){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(localStorage.getItem('id_token')){

            //logged in so return true
            return true
        }
        this.router.navigate(['/login'])
        return false;
    }
}