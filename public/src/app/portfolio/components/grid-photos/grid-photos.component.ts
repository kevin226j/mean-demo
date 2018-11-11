import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { Gallery, GalleryItem, ImageItem, GalleryComponent} from '@ngx-gallery/core';
import { PortfolioPhotoService } from '../../services/portfolio-photos.service';
import { PortfolioAlbumService } from '../../services/portfolio-album.service';
import { PhotoService } from 'src/app/admin/services/photos/photos.service';
import { IAlbum } from 'src/app/admin/services/album/album.entity';
import { IHeaderAlbum } from 'src/app/shared/models/Iheader-album';



@Component({
    selector: 'grid-photos-component',
    templateUrl: './grid-photos.component.html',
})


export class GridPhotosComponent implements OnInit {

    private galleryId = 'myLightbox';
    private items: GalleryItem[]; 
    public masonryOptions: NgxMasonryOptions;
    public albumPhotos : any[];
    private baseurl = 'https://s3-us-west-1.amazonaws.com/kevintestbucket12345/';
    public albumInfo : IAlbum;
    public headerProps : IHeaderAlbum
    public totalCount: any;


    constructor(public gallery: Gallery, private photoService: PhotoService, private portfolioAlbumService: PortfolioAlbumService) {
        this.masonryOptions = {
            columnWidth: 2,
            itemSelector: '.isotope-item',
            gutter: 1,
            transitionDuration: '0.7s'
        }
        this.items = [];
        this.headerProps = {
            title: '',
            numberOfPhotos: 0,
            description: '',
            prevAlbum: ' ',
            nextAlbum: '',
            currentCategory:''
        }
        this.totalCount = 0;
    }


    ngOnInit() {
        this.getPhotosByAlbum();
        this.getAlbumCollection();
    }


    /*Get album collection based on  category. Retrieves album information and associated photos. 
    */
    private getAlbumCollection() {
        let category = this.getCategoryFromUrl();
        let album = this.getAlbumFromUrl();

        this.portfolioAlbumService.getAlbumByName(album,category).subscribe((res:any)=> {
            this.albumInfo = res.item;
            

            this.portfolioAlbumService.getAlbums(category).subscribe((res:any) => {
                let pos = res.items.map((obj:any) => { return obj.name }).indexOf(album)
                let _nextAlbum = res.items[pos+1];
                let _prevAlbum = res.items[pos-1];
                let _currentAlbum = res.items[pos];
                        
                this.headerProps = {
                    title: this.albumInfo.name,
                    numberOfPhotos: this.albumInfo.total,
                    description: this.albumInfo.description,
                    currentCategory: category,
                    prevAlbum: `${category}/${!_prevAlbum? '' : _prevAlbum.name}`,
                    nextAlbum: `${category}/${!_nextAlbum? '' : _nextAlbum.name}`,
                    prevAlbumPhoto: `${this.baseurl}${!_prevAlbum? '' : _prevAlbum.image}`,
                    nextAlbumPhoto: `${this.baseurl}${!_nextAlbum? '' : _nextAlbum.image}`,
                }

            });

        });
        
    }


    /* Function retrieves all photos associated with selected album, located in the url
    */
    private getPhotosByAlbum() {
        const album = this.getAlbumFromUrl();
        this.photoService.GetPhotosByAlbum(album).subscribe((res:any) => {
            this.albumPhotos = res.items;
            this.configureLightBox(res.items);
        });
    }


    /* function that configures the light box module
    */
    private configureLightBox(arr) {
        
        const galleryRef = this.gallery.ref(this.galleryId, {
            loadingStrategy: 'default',
            imageSize: 'contain',
            dots: true,
            disableThumb: true,
            thumb: false,
            zoomOut: 0
        });

        arr.forEach(element => {
            this.items.push(new ImageItem({ src: this.baseurl+element.image, thumbnail: this.baseurl+element.image }));
        }) 
        galleryRef.load(this.items);

    }


    /* function returns the album name from the decoded url.
    */
    private getAlbumFromUrl (){
        let href = decodeURI(window.location.href);
        return href.substring(href.lastIndexOf('/') + 1);
    }


    /* function returns the category type from the decoded url.
    */
    private getCategoryFromUrl () {
        let href = decodeURI(window.location.href);
        let lastNdx = href.lastIndexOf('/');
        let strtNdx = null;
        for(let i = lastNdx-1; i >=0; i--){
            if(href[i] === '/') {
                strtNdx = i; break;
            }
        }
        return href.substring(strtNdx+1,lastNdx);        
    }





}







//FOR TESTING

    // public albumPhotos = [
    //     { src: 'assets/img/stock/image1.jpg', thumbnail: 'assets/img/stock/image1.jpg' },
    //     { src: 'assets/img/stock/image1.jpg', thumbnail: 'assets/img/stock/image1.jpg' },
    //     { src: 'assets/img/stock/image1.jpg', thumbnail: 'assets/img/stock/image1.jpg' },
    //     { src: 'assets/img/stock/image1.jpg', thumbnail: 'assets/img/stock/image1.jpg' },
    //     { src: 'assets/img/stock/image1.jpg', thumbnail: 'assets/img/stock/image1.jpg' },
    //     { src: 'assets/img/album-single/grid/img-7.jpg', thumbnail: 'assets/img/album-single/thumb/img-7.jpg' },
    //     { src: 'assets/img/album-single/grid/img-9.jpg', thumbnail: 'assets/img/album-single/thumb/img-9.jpg' },
    //     { src: 'assets/img/album-single/grid/img-10.jpg', thumbnail: 'assets/img/album-single/thumb/img-10.jpg' },
    //     { src: 'assets/img/album-single/grid/img-11.jpg', thumbnail: 'assets/img/album-single/thumb/img-11.jpg' },
    //     { src: 'assets/img/album-single/grid/img-12.jpg', thumbnail: 'assets/img/album-single/thumb/img-12.jpg' },
    //     { src: 'assets/img/album-single/grid/img-13.jpg', thumbnail: 'assets/img/album-single/thumb/img-13.jpg' },
    //     { src: 'assets/img/album-single/grid/img-14.jpg', thumbnail: 'assets/img/album-single/thumb/img-14.jpg' },
    //     { src: 'assets/img/album-single/grid/img-15.jpg', thumbnail: 'assets/img/album-single/thumb/img-15.jpg' },
    //     { src: 'assets/img/album-single/grid/img-16.jpg', thumbnail: 'assets/img/album-single/thumb/img-16.jpg' },
    //     { src: 'assets/img/album-single/grid/img-17.jpg', thumbnail: 'assets/img/album-single/thumb/img-17.jpg' },
    //     { src: 'assets/img/album-single/grid/img-18.jpg', thumbnail: 'assets/img/album-single/thumb/img-18.jpg' },
    //     { src: 'assets/img/album-single/grid/img-18.jpg', thumbnail: 'assets/img/album-single/thumb/img-18.jpg' },
    //     { src: 'assets/img/album-single/grid/img-18.jpg', thumbnail: 'assets/img/album-single/thumb/img-18.jpg' }
    // ];