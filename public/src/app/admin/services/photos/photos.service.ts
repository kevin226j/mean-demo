import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPhoto } from './photos.entity';


import { Api } from '../../../shared/services/api/api';
import { Observable, forkJoin, of } from 'rxjs';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { S3Service } from 'src/app/shared/services/api/s3/s3.service';

@Injectable({ providedIn: 'root' })

export class PhotoService extends Api<IPhoto>{

    private albums: any[];

    constructor(protected http: HttpClient, private s3: S3Service) {
        super(http);
    }

    public bucketURL = 'https://s3-us-west-1.amazonaws.com/kevintestbucket12345/';

    /* function that retrieves items from the server.
    */
    public GetAlbums() {
        return this.api('albums', 'GET')
        .pipe( map((res: any) => {
                let out = [];
                this.albums = res.items;
                for (let i = 0, n = this.albums.length; i < n; i++) {
                    out.push(this.albums[i].name);
                }
                return out;
        }))
    }

    public GetPhotos() {
        return this.api('photos', 'GET')
    }

    /* function that retrieves an item by id from the server.
    */
    public GetPhotosByAlbum(album: string) { 
        return this.api(`photos/${album}`, 'GET')
    }


    /* function that posts image to aws s3 bucket, return token is then added to payload before sending to the server. Utilizing forkJoin for multiple http calls
           *@form payload sent to server with properties albumName and image. image is an array of files to be uploaded to aws s3 and server
    */
    public Post(form: IPhoto|any) {
        const calls = []
        form.image.forEach(element => {
            calls.push(this.s3.Upload(element).pipe(map((res:any) => {
                let obj:any = {image : res.key, albumName : form.albumName};
                return this.api('photos', 'POST', obj).subscribe()
            })))
        });
        return forkJoin(calls)
    }



    public Update(id:string, payload: IPhoto){
        return this.api(`photos/${id}`, 'PUT', payload);
    }

    /* function that deletes target image from aws s3 and deletes album from server, in that order.
           *@id takes in the id of the album for parsing
    */
    public Delete(id: string, imageKey: string) {
        const calls = [this.s3.DeleteMedia([imageKey]), this.api(`photos/${id}`, 'DELETE')]
        return forkJoin(calls)
    }



}