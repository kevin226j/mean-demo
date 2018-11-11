import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: '[intro-caption-component]',
    template: `

            <h1 class="intro-title"> {{title}} </h1>
            <p class="intro-text hide-from-xs"> {{caption}} </p>
            <div class="intro-button-wrap">
            <a href="/portfolio" class="btn btn-default btn-rounded-5x">View Albums</a>
            <a href="/dashboard" class="btn btn-default btn-rounded-5x">Create An Album</a>
            </div>
        
    `,
    encapsulation : ViewEncapsulation.None
})

export class IntroCaptionComponent {
    title : string;
    caption: string;

    constructor(){
        this.title = 'Welcome to the SharePhotos demo!'
        this.caption = 'Feel free to add an album of your own, and share it with everyone!'
    }

    
}