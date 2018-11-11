import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorResponseHandler } from '../../handlers/error-response';

let httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': ['application/json'] })
};

export class Api<T> {
    [x: string]: any;

    constructor(protected http: HttpClient) { }


    public baseURL = "http://localhost:8080/api";


    public extractData = (res: Response) => {
        let body = res;
        return body || {};
    }

    /* generic api function that performs the http requests
       *@URL endpoint of the api route
       *@action determines the type of request, parsed through a switch statement
       *@payload data sent to change items in the db
    */

    public api = (URL: string, action: string, payload?: T): Observable<any> => {

        let _url = `${this.baseURL}/${URL}`;

        switch (action) {
            case 'GET':
                return this.http.get<T>(_url, httpOptions).pipe(
                    map(this.extractData),
                    catchError(this.ErrorResponseHandler)
                )

            case 'POST':
                return this.http.post(_url, payload).pipe(
                    map(this.extractData),
                    catchError(this.ErrorResponseHandler)
                )


            case 'PUT':
                return this.http.put<T>(_url, payload, httpOptions).pipe(
                    map(this.extractData),
                    catchError(this.ErrorResponseHandler)
                )


            case 'DELETE':
                return this.http.delete<T>(_url, payload).pipe(
                    map(this.extractData),
                    catchError(this.ErrorResponseHandler)
                )

        }
    }
}


