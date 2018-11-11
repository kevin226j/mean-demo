import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Api} from '../api';

@Injectable({providedIn: 'root'})

export class S3Service extends Api<any>{
    private apiRoute = 'aws';

    constructor(protected http: HttpClient){
        super(http);
    }

    public Upload (data: File) {
        const formData = new FormData();
        formData.append('image', data);

        return this.api(this.apiRoute,'POST',formData);
    }


    public DeleteMedia (data: string[]) : Observable<any>{
        let obj = {items : data};
        let options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: (obj)
          };
        return this.api(this.apiRoute, 'DELETE', options);
        
    }
}
