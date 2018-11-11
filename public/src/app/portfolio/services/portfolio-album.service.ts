import {Component, Injectable} from '@angular/core';
import { AlbumService } from 'src/app/admin/services/album/album.service';
import { Api } from 'src/app/shared/services/api/api';
import { IAlbum } from 'src/app/admin/services/album/album.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })


export class PortfolioAlbumService extends Api<IAlbum> {
    constructor(protected http: HttpClient, private albumService: AlbumService) {
        super(http)
    }

    /* Function to get particular albums based on category.
        * @category input used to retrieve particular tab category of view
    */
    public getAlbums(category:string){
        let _category = category.charAt(0).toUpperCase() + category.slice(1);
        return this.api(`albums/album/${_category}`, 'GET')
    }
    
    /* Function to get all albums in server.
    */    
    public getAllAlbums(){
        return this.api('albums', 'GET')
    }


    public getAlbumByName(nameOfAlbum: string, category: string) {
        let _category = category.charAt(0).toUpperCase() + category.slice(1);
        return this.api(`albums/album/${_category}/${nameOfAlbum}`, 'GET')
    }
    
}