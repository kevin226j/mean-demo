import {BaseResponse} from './baseResponse';

export class ErrorResponse extends BaseResponse {
    constructor(err){
        super();
        this.isSuccessful = false;
        this.errors = err;
        this.alert.type = 'danger';
    }
}