import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITag } from './tags.entity';


import { Api } from '../../../shared/services/api/api';
import { Observable, forkJoin, of } from 'rxjs';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { S3Service } from 'src/app/shared/services/api/s3/s3.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Injectable({ providedIn: 'root' })

export class TagService extends Api<ITag>{

    private tags: any[];

    constructor(protected http: HttpClient) {
        super(http);
    }


    /* function that retrieves items from the server.
    */
    public GetTags() {
        return this.api('tags', 'GET')
    }

    /* function that retrieves an item by id from the server.
    */
    public GetTagById(id: string) { 
        return this.api(`tags/${id}`, 'GET')
    }

    /* function that posts/saves an item by id from the server.
        *@form represents the payload type 
    */
    public Post(form:ITag){
        form.tagName = form.tagName.trim();
        return this.api('tags', 'POST', form)
    }
   
    /* function that updates an item by id from the server.
        *@payload represents the payload type
        *@id is the id of the item
    */
    public Update(id:string, payload: ITag){
        payload.tagName = payload.tagName.trim();
        return this.api(`tags/${id}`, 'PUT', payload);
    }

    /* function that deletes target from server
           *@id takes in the id of the selected tag
    */
    public Delete(id: string) {
        return this.api(`tags/${id}`, 'DELETE')
    }



}