import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {IHeaderAlbum} from '../../models/Iheader-album';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: '[album-header-component]',
    templateUrl: './album-header.component.html'    
})




export class AlbumHeaderComponent implements OnChanges{
    @Input() props : IHeaderAlbum

    private prevPhoto: any;
    private nextPhoto: any;

    constructor(private _sanitizer: DomSanitizer ) {
    }

    ngOnChanges(){
        if(this.props.prevAlbumPhoto )
            this.prevPhoto = this._sanitizer.bypassSecurityTrustStyle(`url(${this.props.prevAlbumPhoto})`);
        if(this.props.nextAlbumPhoto)
            this.nextPhoto = this._sanitizer.bypassSecurityTrustStyle(`url(${this.props.nextAlbumPhoto})`);
    }

}

