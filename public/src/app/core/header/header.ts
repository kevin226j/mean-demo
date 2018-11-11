import { Component, ViewEncapsulation, OnInit, OnDestroy, ElementRef, AfterViewInit, NgModule, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/admin/services/album/album.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: '[header-component]',
    templateUrl: './header.html',
    styles: [`a:hover{cursor:pointer}`],
})

export class HeaderComponent implements OnInit {
    public href: string;

    public portfolioCategory = [];

    private selectedDropDown: any;

    public innerWidth: any;

    isIn: boolean = false;   // store state

    constructor(private router: Router, private albumService: AlbumService, private elementRef: ElementRef, private route: ActivatedRoute, public authService: AuthService, private spinner: NgxSpinnerService) {
    }


    ngOnInit() {
        if (this.authService.isLoggedIn()) {

            this.href = window.location.href;
            this.albumService.GetAll().subscribe((res: any) => {
                this.containCategory(res.items);
            })
            this.selectedDropDown = '';
            this.innerWidth = window.innerWidth;
        }
    }

    public onResize(event) {
        this.innerWidth = event.target.innerWidth;
    }



    private containCategory(items: any[]) {

        let set = {}//TODO: MAKE SURE TO REMOVE ANY DUPLICATES
        for (let i = 0, n = items.length; i < n; i++) {
            if (!set[items[i].tag]) {
                switch (items[i].category) {
                    case 'Portfolio':
                        this.portfolioCategory.push(items[i].tag);
                }
                set[items[i].tag] = true;
            }
        }
    }

    //mouse over event.
    public searchTag(event) {
        this.selectedDropDown = event.target.text.trim();
    }


    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
    }

    public logout() {
        this.spinner.show();
        this.authService.logout();
        setTimeout(() => {
            this.spinner.hide();
            window.location.href = 'login';
        }, 1000)
    }
}