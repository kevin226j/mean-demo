import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/api/auth.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from "moment";

@Component({
    selector: 'admin-component',
    templateUrl: './admin.component.html',
    styles: [
        `
            a:hover {
                cursor: pointer;
            }
        `
    ]
})

export class AdminComponent implements OnInit {

    @ViewChild('welcomeSwal') private welcomeSwal: SwalComponent;

    public current: string;
    public showLogout: boolean;

    constructor(public authService: AuthService, private router: Router, private spinner: NgxSpinnerService) {
        this.current = 'welcome';
    }

    ngOnInit() {
        if (this.authService.getExpiration() < moment().unix()) {
            this.logout();
        } else {
            this.spinner.show()
            setTimeout(() => {
                this.spinner.hide();
            }, 2000);
            if (this.authService.isLoggedIn) {
                this.showLogout = true;
            }
        }
    }

    public logout() {
        this.spinner.show();
        this.authService.logout();
        setTimeout(() => {
            this.spinner.hide();
            window.location.href = 'login';
        }, 2500)

    }

    public setComponent(str): void {
        switch (str) {
            case 'album':
                this.current = str;
                break;
            case 'photos':
                this.current = str;
                break;
            case 'tag':
                this.current = str;
                break;
            case 'welcome':
                this.current = str;
        }
    }
}