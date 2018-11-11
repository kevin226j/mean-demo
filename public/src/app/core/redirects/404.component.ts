import { Component } from "@angular/core";
import { style } from "@angular/animations";

@Component({
    template: `
        <section id="page-header-secion" class="alter-heading error" >
        </section>
        <section id="content-section" class="page page-404 full-page bg-image" style="background-image: url(); background-position: 50% 50%; height: 557px;">
        <div class="cover bg-transparent-7-dark"></div>        
        <div class="content-wrap align-center text-center padding-60">
            <h1>404 Error.</h1>
            <h5>Page Not Found</h5>
        <a href="/" class="btn btn-primary btn-rounded-5x btn-block margin-top-35">Back to home</a>
        </div>
    <!-- End content wrap -->

</section>
    `
    ,styles: [`
        .error{ width: 100%; background-color: rgba(0, 0, 0, 0.7); color: rgba(0, 0, 0, 0.7) }
    `]
})

export class _404Component {
    constructor(){}
}