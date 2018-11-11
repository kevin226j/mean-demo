import { Pipe, PipeTransform, Input } from '@angular/core';

@Pipe({name: 'filterByTag'})



export class FilterByTagPipe implements PipeTransform {

    private originalSet: any[]

    transform(data: any[], tagInput:string){
        if(tagInput !== 'All'){ 
            return (data.filter(itm=> itm.tag === tagInput));
        }
        return data;
    }
}