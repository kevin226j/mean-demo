import { of, Observable } from 'rxjs';

export const ErrorResponseHandler = (error: Response | any) => {

    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
}