import { Component, DoCheck, ChangeDetectorRef, ViewChild, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { S3Service } from '../../../shared/services/api/s3/s3.service';
import { AlbumService } from '../../services/album/album.service';
import { IAlbum } from '../../services/album/album.entity';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { TagService } from '../../services/tags/tags.service';


class Status {
    id: string;
    selectedImage: File
}

@Component({
    selector: 'admin-album-component',
    templateUrl: './admin-album.component.html',
    styleUrls: ['./admin-album.component.css']
})

export class AdminAlbumComponent implements OnInit {
    
    @ViewChild('successSwal') private successSwal: SwalComponent;
    @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

    /* variable intialization 
    */
    public albumForm: FormGroup;
    public albums: IAlbum[];
    public status = new Status();
    public tagItems: string[];
    public categoryItems: string[];

    constructor(private formBuilder: FormBuilder, private s3: S3Service, private albumService: AlbumService, private tagService: TagService, private spinner: NgxSpinnerService) {
        this.buildForm(); //build form group
        this.getAlbums(); //load albums from server
        this.categoryItems = ["Portfolio"];
    }



    /* function that builds the form controls using Model Driven Forms architecture
    */
    private buildForm(): void {
        this.albumForm = this.formBuilder.group({
            name: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
            image: this.formBuilder.control(null, [Validators.required, Validators.min(2)]),
            description: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
            tag: this.formBuilder.control(null, [Validators.required, Validators.min(1)]),
            category: this.formBuilder.control('Portfolio', [Validators.required, Validators.min(1)])
        });
    }
 
    ngOnInit(){
        this.getTags(); //load up tags from server
    }


    /* function that allows file to be transfered from <upload-component> and ready for processing
        * @e is of event emiter result. return is an object with 'src' and 'file'
    */
    public getFile(e: any): void {
        this.status.selectedImage = e.file;
    }



    /* function to reset form controls to initial state. 
    */
    private clearForm(): void {
        setTimeout(() => { 
            this.albumForm.reset(); 
        }, 200);
    }



    /* function to refresh album data after a successful DELETE, UPDATE, OR POST
    */
    private refreshData(): void {
        setTimeout(() => this.getAlbums(), 200);
    }



    /* function to refresh all items in current component
    */
    private refreshComponent(): void {
        this.clearForm();
        this.refreshData();
        this.status = new Status();
    }

    /* function that retrieves all tags with a GET http request to server
    */
    private getTags(): void {
        this.tagService.GetTags().subscribe((res: any) => { 
            let out = [];
            for(let i = 0, n = res.items.length; i < n; i++){
                out.push(res.items[i].tagName);
            }
            this.tagItems = out; 
        });
    }


    /* function that retrieves all albums with a GET http request to server
    */
    private getAlbums(): void {
        this.albumService.GetAll().subscribe((res: any) => { this.albums = res.items; });
    }



    /* function runs when 'edit' or 'remove' icon is clicked. 'edit' uses GET BY ID to retrieve album info. Info is then patched to form control values
        * @id takes the id of the album
        * @action determines the action of the function, to either DELETE or UPDATE
    */
    private onClick(id: string, action: string) {
        if (action === 'edit') {
            this.albumService.GetById(id).subscribe((res: any) => {
                this.albumForm.patchValue(res.item); this.setStatus(res.item);
            })
        } else if (action === 'remove') {
            this.deleteSwal.show().then(res => {
                if (res.value) {
                    this.spinner.show();
                    this.albumService.Delete(id).add((res: any) => {
                        this.refreshComponent();
                        setTimeout(() => { this.spinner.hide(); }, 1000);
                    })
                }
            })
        }
    }



    /* function will run to set current status state to determine id of selected album.
    */
    private setStatus(info) {
        this.status.id = info._id;
    }



    /* function will submit form data on a POST or UPDATE request. Determined by status.id.
    */
    public onSubmit(): void {
        this.spinner.show();
        if (this.status.id) { // update
            this.albumService.Update(this.albumForm.value, this.status.id, this.status.selectedImage).subscribe((res) => {
                this.refreshComponent()
                setTimeout(() => { this.spinner.hide() }, 1000);
                setTimeout(() => { this.successSwal.show(); }, 1000);
            })
        } else { //post
            this.albumService.Post(this.albumForm.value, this.status.selectedImage).subscribe(res => {
                this.refreshComponent();
                setTimeout(() => { this.spinner.hide() }, 1000);
                setTimeout(() => { this.successSwal.show(); }, 1000);
            })
        }

    }
    
}





