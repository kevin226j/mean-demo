import { Component, DoCheck, OnChanges, SimpleChanges, Input, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { BehaviorSubject } from 'rxjs';
import { setStyles } from '@angular/animations/browser/src/util';
import { PhotoService } from '../../services/photos/photos.service';
import { timeout, debounce, debounceTime } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { AlbumService } from '../../services/album/album.service';



@Component({
    selector: 'admin-photos-component',
    templateUrl: './admin-photos.component.html',
    styles: [
        `
         .imagesize {width: 200px; height:150px;}
         .lg-trigger:hover {cursor: pointer}
         .btn {float:right}
       `
    ]
})

export class AdminPhotosComponent implements OnInit {

    @ViewChild('successSwal') private successSwal: SwalComponent;
    @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

    public myOptions: NgxMasonryOptions;
    public photoForm: FormGroup;
    public photosToUpload = [];
    public photosToDisplay = [];
    public photosFromAlbum = [];
    public albumItems: string[];

    private awsbucket = 'https://s3-us-west-1.amazonaws.com/kevintestbucket12345/';


    constructor(private formBuilder: FormBuilder, private photoService: PhotoService, private cd: ChangeDetectorRef, private spinner: NgxSpinnerService, private albumService: AlbumService) {
        this.buildForm();
        this.myOptions = {
            columnWidth: 2,
            itemSelector: '.isotope-item',
            gutter: 2, 
            transitionDuration: '0.6s'
        }

    }





    /* function is part of the life-cyle hook that retrieves all album tags. first selected item in drop down component calls the getPhotos() method
    */
    ngOnInit() {
        this.cd.markForCheck();
        this.photoService.GetAlbums().subscribe((res: any) => {
            this.albumItems = res;
            this.photoForm.patchValue({ albumName: this.albumItems[0] })
            this.getPhotos(this.photoForm.value.albumName);
        })
    }







    /* function that retrieves photos from an album
        *@event is an input, returned by an event emmiter from the dropdown component to determine selection. if null/undefined, there are no photos to show
    */
    public getPhotos(event: any) {
        this.spinner.show();
        if (!event) {
            this.photosFromAlbum = null;
        } else {
            this.photoService.GetPhotosByAlbum(event.albumName).subscribe((res: any) => {
                this.photosFromAlbum = null;
                this.photosFromAlbum = res.items
                this.cd.markForCheck();
                setTimeout(()=>{this.spinner.hide();},2000);
            })
        }
    }




    private refreshPage(): void {
        this.photoForm.controls.image.reset();
        this.getPhotos({ albumName: this.photoForm.value.albumName });
    }




    /* function that constructs the form controls
    */
    private buildForm(): void {
        this.photoForm = this.formBuilder.group({
            albumName: this.formBuilder.control(null, [Validators.required, Validators.min(1)]),
            image: this.formBuilder.control(null, Validators.required),
        });
    }




    /* function to retrieve file from the upload input
        *@e is the event emitted by the upload component. The return is a data File object.
    */
    public getFile(e: any): void {
        this.photosToUpload.push(e.file);
        this.photosToDisplay.push(e.src);
        this.photoForm.controls.image.reset();
    }




    /* function that removes and resets all the files to upload and to display from the page. 
    */
    private resetFiles(): void {
        this.photosToUpload = [];
        this.photosToDisplay = [];
    }




    /* function to either delete phot from preview section or from album
        *@id is the associated id
        *@imageKey is to determine if a key exixts, if it doesn't is is part of the preview section
    */
    private onDelete(id?: any, imageKey?: any) {
        //remove photo from preview section
        if (imageKey === undefined) {
            setTimeout(() => {this.photosToDisplay.splice(id, 1); this.photosToUpload.splice(id,1)}, 200);
        } else {
            //remove photo from current this.photosToUpload and photosToDisplay
            this.deleteSwal.show().then(res => {
                if (res.value) {
                    this.photoService.Delete(id, imageKey).subscribe(res => {
                        this.albumService.UpdateCount(this.photoForm.value.albumName);
                        this.refreshPage();
                    })
                }
            })
        }
    }





    /* function to upload photos to album and resets the image controls for the form
    */
    public onSubmit() {
        this.photoForm.patchValue({ image: this.photosToUpload })
        if (this.photosToUpload.length !== 0) {
            this.spinner.show();
            this.photoService.Post(this.photoForm.value).subscribe(res => {
                this.albumService.UpdateCount(this.photoForm.value.albumName);
                this.refreshPage();
                this.resetFiles();
                setTimeout(()=>{this.spinner.hide();},2000);
            })
        }
    }


}