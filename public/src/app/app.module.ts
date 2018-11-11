import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from  '@ngx-gallery/core';
import { LightboxModule } from  '@ngx-gallery/lightbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner'; 
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgMasonryGridModule } from 'ng-masonry-grid';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './core/app-routing';

//directives
import {SubmitFormIfValidDirective} from './shared/directives/form-validation';

//views 
import {HomeComponent} from './home/home.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {LoginComponent} from './core/login/login.component';
import {AdminComponent} from './admin/admin.component';


//services
import {AlbumService} from './admin/services/album/album.service';
import {S3Service} from './shared/services/api/s3/s3.service';
import { PortfolioAlbumService } from './portfolio/services/portfolio-album.service';
import { PortfolioPhotoService } from './portfolio/services/portfolio-photos.service';
import { TagService } from './admin/services/tags/tags.service';



//components
import {FooterComponent} from './core/footer/footer';
import {HeaderComponent} from './core/header/header';
import {IntroImageComponent} from './home/components/intro-image/intro-image.component';
import {IntroCaptionComponent} from './home/components/intro-caption/intro-caption.component';
import {HeaderImageComponent} from './shared/components/header-image/header-image.component';
import {AlbumHeaderComponent} from './shared/components/album-header/album-header.component';
import {MasonryAlbumComponent} from './portfolio/components/masonry-album/masonry-album.component';
import {GridPhotosComponent} from './portfolio/components/grid-photos/grid-photos.component';
import {AdminAlbumComponent} from './admin/components/album/admin-album.component';
import {AdminPhotosComponent} from './admin/components/photos/admin-photos.component';
import { AdminManageTagComponent } from './admin/components/managetag/admin-managetag.component';
import {InputComponent} from './shared/components/form/input';
import {TextAreaComponent} from './shared/components/form/textarea';
import {DropDownComponent} from './shared/components/form/dropdown';
import {UploadComponent} from './shared/components/upload/upload.component';
import { CheckboxComponent } from './shared/components/form/checkbox';
import { _401Component } from './core/redirects/401.component';
import { _404Component } from './core/redirects/404.component';


//pipes
import { FilterByTagPipe } from './shared/pipes/filter';


//providers
import { AuthInterceptor } from './core/helpers/auth.interceptor';
import { AuthGuard } from './core/guards/auth.guard';


//enable production mode;
enableProdMode();


@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    PortfolioComponent,
    LoginComponent,
    AdminComponent,
    FooterComponent,
    HeaderComponent,
    IntroImageComponent,
    IntroCaptionComponent,
    HeaderImageComponent,
    AlbumHeaderComponent,
    MasonryAlbumComponent,
    GridPhotosComponent,
    AdminAlbumComponent,
    AdminPhotosComponent,
    AdminManageTagComponent,
    _401Component,
    _404Component,
    InputComponent,
    TextAreaComponent,
    DropDownComponent,
    CheckboxComponent,
    UploadComponent,
    SubmitFormIfValidDirective,
    FilterByTagPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxMasonryModule,
    NgMasonryGridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    GalleryModule.forRoot(),
    SweetAlert2Module.forRoot(),
    LightboxModule.forRoot({panelClass: 'fullscreen'})
  ],
  providers: [
    AlbumService, 
    S3Service, 
    TagService, 
    PortfolioAlbumService, 
    PortfolioPhotoService, 
    AuthInterceptor, 
    AuthGuard, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
