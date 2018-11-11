import {Component, Injectable} from '@angular/core';
import { AlbumService } from 'src/app/admin/services/album/album.service';
import { Api } from 'src/app/shared/services/api/api';
import { IAlbum } from 'src/app/admin/services/album/album.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })


export class PortfolioPhotoService extends Api<IAlbum> {
    constructor(protected http: HttpClient) {
        super(http)
    }

    /* Function to get particular albums based on category.
        * @category input used to retrieve particular tab category of view
    */
    public getPhotosFromAlbum(album:string){
        let href = window.location.href;
        //return this.api(`photos/${album}`, 'GET');
    }
    
    /* Function to get all albums in server.
    */    
    public getAllPhotosFromAlbums(){
        return this.api('photos', 'GET')
    }
    
}