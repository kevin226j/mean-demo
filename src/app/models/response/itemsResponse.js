import {SuccessResponse} from './successResponse';

export class ItemsResponse extends SuccessResponse {
    constructor(data){
        super();
        this.items = data;
    }
}