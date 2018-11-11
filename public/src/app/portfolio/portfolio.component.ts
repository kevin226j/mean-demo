import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../admin/services/album/album.service';
import { PortfolioAlbumService } from './services/portfolio-album.service';
import { Observable } from 'rxjs';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid';

@Component({
    selector: 'portfolio-component',
    templateUrl: 'portfolio.component.html',
    styleUrls: ['portfolio.component.css']
})

export class PortfolioComponent implements OnInit {

    public Albums: any[];

    constructor(private portfolioService: PortfolioAlbumService) {
    }
    ngOnInit(){
        this.portfolioService.getAllAlbums().subscribe((res:any) => {
            this.Albums = res.items;
        });
    }
}