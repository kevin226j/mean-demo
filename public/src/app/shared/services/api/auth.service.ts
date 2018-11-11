import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Api } from "./api";
import { map, shareReplay } from "rxjs/operators";
import * as moment from "moment";

class User {
    email: string;
    password: string;
}

@Injectable({providedIn: 'root'})
export class AuthService extends Api<User> {
    private apiRoute = 'login';

    constructor(protected http: HttpClient) {
        super(http);
    }

    public login(email: string, password: string){
        return this.api(this.apiRoute, 'POST', {email, password}).pipe(
            map((res:any) => { 
                if(res.error){ 
                    return false;
                } else {
                    this.setSession(res) 
                    return true;
                }
            }),
            shareReplay())
    }

    private setSession(authResult){
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        localStorage.setItem('id_token',authResult.token);
        localStorage.setItem('expires_at',JSON.stringify(expiresAt.valueOf()));
    }


    public logout(){
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn(){
        return moment().isBefore(this.getExpiration());
    }


    public isLoggedOut() {
        return !this.isLoggedIn();
    }


    public getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return expiresAt;
    }
}