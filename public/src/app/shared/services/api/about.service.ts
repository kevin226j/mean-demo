import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Api } from "./api";


class About {
    id: string;
    title: string;
    body: string;
    quote: string;
    image: string;
}

@Injectable({providedIn: 'root'})

export class AboutService extends Api<About> {
    private apiRoute = 'about';

    constructor(protected http: HttpClient) {
        super(http);
    }

    public Get() {
        return this.api(`${this.apiRoute}`, 'GET')
    }

    public Update(id: string, payload:any){
        return this.api(`${this.apiRoute}/${id}`, 'PUT', payload);
    }

}