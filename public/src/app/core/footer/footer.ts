import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/api/auth.service';

@Component({
    selector: '[footer-component]',
    templateUrl: './footer.html',
    styles: [`
    .body-content {
        padding:10px;
        padding-bottom:60px;   /* Height of the footer */
     }
     .footer {
        position:absolute;
        bottom:0;
        width:100%;
        height:60px;   /* Height of the footer */
        background:#6cf;
     },
     .footer-inner {
        padding-top: 30px !important;
        padding-bottom: 30px !important;
     }
    `],
    encapsulation: ViewEncapsulation.None
})

export class FooterComponent{
    constructor(public authService: AuthService) { }
}