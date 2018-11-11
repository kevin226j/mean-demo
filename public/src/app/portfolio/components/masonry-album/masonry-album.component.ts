import { Component, Input, OnInit, AfterContentInit, AfterViewInit, OnChanges, ElementRef, NgModule } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { ActivatedRoute } from '@angular/router';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid';


@Component({
    selector: 'masonry-album-component',
    templateUrl: './masonry-album.component.html',
    styles: [`a:hover{cursor: pointer}`]
})


export class MasonryAlbumComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() albumItems: any[];

    public tagItems: any[];

    private href: string;

    public tagSelection: string;

    private originalSet: any[];

    public updateMasonryLayout = 0;

    masonryItems : any[];

    _masonry: Masonry;

    isIn : boolean = false;   // store state

    private baseurl = 'https://s3-us-west-1.amazonaws.com/kevintestbucket12345/';

    constructor(private elementRef:ElementRef, private route: ActivatedRoute) {
        this.tagSelection = 'All';
    }

    /* Options for masonry plug-in
    */
    public myOptions: NgxMasonryOptions = {
        columnWidth: 1,
        itemSelector: '.isotope-item',
        gutter: 1,
        transitionDuration: '0.5s',
        //horizontalOrder: true,
        resize: true,
        fitWidth:false
    };

    ngOnInit(){
    }


    /*Functions waits for this.albumItems before initialization
    */
    ngOnChanges() {
        let paramNdx = null;
        if (!!this.albumItems) {
            this.tagItems = this.getTagItems(this.albumItems);
            this.originalSet = this.albumItems;
            if(this.route.snapshot.queryParams['prefilter'] !== undefined){
                this.tagSelection = decodeURI(this.route.snapshot.queryParams['prefilter']);
                paramNdx = window.location.href.indexOf('?');
            }
        }
        
        this.href = (paramNdx !== null) ? window.location.href.substring(0, paramNdx) : window.location.href
    }

 
    /* get tag key value from this.albumItems for filter key words.
    */
    public getTagItems(items) {
        let set = {};
        let tagItems = [];
        for (let i = 0, n = items.length; i < n; i++) {
            if (!set[items[i].tag]) {
                tagItems.push(items[i].tag);
                set[items[i].tag] = true;
            }
        }
        tagItems.unshift('All');
        return tagItems;
    }


    ngAfterViewInit() {
        this.elementRef.nativeElement.querySelector('.isotope-filter-links')
            .addEventListener('click', this.onClick.bind(this));
    }

    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
      }


    onClick(event){
        
        this.albumItems = this.originalSet;
        this.tagSelection = event.target.text;

        if(this.tagSelection === 'All'){
            this._masonry.reloadItems();
        }else if (!event){
            this.tagSelection === 'All';
        }
        
    }

    public checkIfLoaded(e?: any) {
        this._masonry.once('layoutComplete', () => {
            this._masonry.items[0].element.classList.add('width2');
        })
    }

    public onNgMasonryInit(e : Masonry) {
        this._masonry = e;
    }
}