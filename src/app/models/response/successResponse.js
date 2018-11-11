import {BaseResponse} from './baseResponse';

export class SuccessResponse extends BaseResponse {
    constructor(){
        super();
        this.isSuccessful = true;
        this.alert.type = 'success'
    }
}