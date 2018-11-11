import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAlbum } from './album.entity';


import { Api } from '../../../shared/services/api/api';
import { Observable, forkJoin } from 'rxjs';
import { take, map, switchMap, tap, switchMapTo } from 'rxjs/operators';
import { S3Service } from 'src/app/shared/services/api/s3/s3.service';
import { PhotoService } from '../photos/photos.service';
import { IPhoto } from '../photos/photos.entity';


class DeleteItems {
    keys: string[];
    ids: string[];
}

@Injectable({ providedIn: 'root' })
export class AlbumService extends Api<IAlbum>{
    private apiRoute = 'albums';

    private albums: IAlbum[];
    private album: IAlbum;
    private imgKey: string;


    constructor(protected http: HttpClient, private s3: S3Service, private photoService: PhotoService) {
        super(http);
    }


    /* function that retrieves items from the server.
    */
    public GetAll() {
        return this.api(this.apiRoute, 'GET')
    }


    /* function that retrieves an item by id from the server.
    */
    public GetById(id: string) {
        return this.api(`${this.apiRoute}/${id}`, 'GET')
    }


    /* function that posts image to aws s3 bucket, return token is then added to payload before sending to the server.
           *@data payload sent to server
           *@image file to be uploaded to aws s3 bucket
    */
    public Post(data: IAlbum, image: File) {
        data.tag = data.tag.trim();
        data.name = data.name.trim();
        data.total = 0;
        return this.s3.Upload(image).pipe(
            map((res: any) => data.image = res.key),
            switchMap(res => res && this.api(this.apiRoute, 'POST', data))
        )
    }


    /* function that posts image to aws s3 bucket, return token is then added to payload before sending to the server.
           *@data payload sent to server
           *@image file to be uploaded to aws s3 bucket
           *id is the required id to target an item in the collection
    */
    public Update(data: IAlbum, id: string, image: any) {
        data.tag = data.tag.trim();
        data.name = data.name.trim();
        
        return this.GetById(id).pipe(map( (res:any) => {
            this.imgKey = res.item.image;

            //update if album names are different, if they are, update all photos with new album name.
            if(typeof data.image === 'string' && res.item.name !== data.name){
                let newName = data.name;
                let oldName = res.item.name
                let calls = [];
                this.photoService.GetPhotosByAlbum(oldName).subscribe((res:any) => {
                    for(let i = 0, n = res.items.length; i < n; i++){
                        let obj : IPhoto = {
                            albumName: newName,
                            image: res.items[i].image
                        };
                        calls.push(this.photoService.Update(res.items[i]._id, obj).subscribe())
                    }
                    calls.push(this.api(`${this.apiRoute}/${id}`, 'PUT', data).subscribe()); //update album at the end.
                    forkJoin(calls);
                })
            //update only if album image hasn't changed.
            } else if (typeof data.image === 'string') {
                
                return this.api(`${this.apiRoute}/${id}`, 'PUT', data).subscribe()

            } else {
            //update if new album image uploaded.
                return this.s3.DeleteMedia([this.imgKey]).subscribe(res => {
                    this.s3.Upload(image).subscribe((res:any) => {
                        data.image = res.key;
                        this.api(`${this.apiRoute}/${id}`, 'PUT', data).subscribe()
                    })
                })
            }
        }))
    }


    public UpdateCount(albumName:any){
        return this.photoService.GetPhotosByAlbum(albumName).subscribe(async (res:any) =>{
            let albumInfo: IAlbum;
            let count = res.items.length;
            return this.GetAll().subscribe(async (res:any) =>{
                albumInfo = await res.items.filter(itm => itm.name === albumName);
                albumInfo[0].total = count;
                return this.api(`${this.apiRoute}/${albumInfo[0]._id}`, 'PUT', albumInfo[0]).subscribe();
            })
        })
    }


    /* function that deletes target image from aws s3 and deletes album from server, in that order.
           *@id takes in the id of the album for parsing
    */
    public Delete(id: string) {
        let photosToDelete = new DeleteItems();
        let photosToDeleteCall = [];

        //grab album info
        return this.GetById(id).subscribe((res: any) => {
            this.album = res.item;
            //get all photos by album, get them ready for deletion in aws s3.
            this.photoService.GetPhotosByAlbum(this.album.name).subscribe((res: any) => {
                
                for (let i = 0, n = res.items.length; i < n; i++) {
                    //collect forkjoin calls
                    photosToDeleteCall.push(this.photoService.Delete(res.items[i]._id, res.items[i].image));
                }
                //delete album from server
                this.api(`${this.apiRoute}/${id}`, 'DELETE').subscribe((res: any) => {
                    
                })

                //delete album photo from aws s3
                this.s3.DeleteMedia([this.album.image]).subscribe(res => {})
                forkJoin(photosToDeleteCall).subscribe(res => {})
            })
        })
    }



}