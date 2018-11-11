import {Component, ViewEncapsulation, Input, OnChanges} from '@angular/core';
import {IHeaderImage} from '../../models/Iheader-image';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: '[header-image-component]',
    templateUrl: './header-image.component.html',
    styles:[],
    encapsulation: ViewEncapsulation.None
})

export class HeaderImageComponent implements OnChanges{

    @Input() props : IHeaderImage
    public imageURL : any;

    constructor(private _sanitizer: DomSanitizer ){
    }

    ngOnChanges(){
        this.imageURL = this._sanitizer.bypassSecurityTrustStyle(`url(${this.props.image})`);
    }
} 