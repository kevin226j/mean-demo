import {SuccessResponse} from './successResponse';

export class ItemResponse extends SuccessResponse {
    constructor(data){
        super();
        this.item = data;
    }
}