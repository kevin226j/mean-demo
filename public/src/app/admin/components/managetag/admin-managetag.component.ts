import { Component, DoCheck, ChangeDetectorRef, ViewChild} from '@angular/core';
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
    selector: 'admin-managetag-component',
    templateUrl: './admin-managetag.component.html',
    styleUrls: ['./admin-managetag.component.css']
})

export class AdminManageTagComponent {
    
    @ViewChild('successSwal') private successSwal: SwalComponent;
    @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

    /* variable intialization 
    */
    public tagForm: FormGroup;
    public tags: any[];
    public status = new Status();


    constructor(private formBuilder: FormBuilder, private tagService: TagService, private spinner: NgxSpinnerService) {
        this.buildForm(); //build form group
        this.getTags(); //load albums from server
        //this.tagItems = ["Portraits", "Family", "Location", "Studio", "Modern Look", "Restored Images", "Restaurants/ Bars", "Small Businesses", "Products", "Halloween"];
        //this.categoryItems = ["Overview", "Commercial", "Projects"];
    }



    /* function that builds the form controls using Model Driven Forms architecture
    */
    private buildForm(): void {
        this.tagForm = this.formBuilder.group({
            tagName: this.formBuilder.control('', [Validators.required, Validators.min(1)])
        });
    }
 

    /* function to reset form controls to initial state. 
    */
    private clearForm(): void {
        setTimeout(() => { 
            this.tagForm.reset(); 
        }, 200);
    }



    /* function to refresh album data after a successful DELETE, UPDATE, OR POST
    */
    private refreshData(): void {
        setTimeout(() => this.getTags(), 200);
    }



    /* function to refresh all items in current component
    */
    private refreshComponent(): void {
        this.clearForm();
        this.refreshData();
        this.status = new Status();
    }



    /* function that retrieves all albums with a GET http request to server
    */
    private getTags(): void {
        this.tagService.GetTags().subscribe((res: any) => { this.tags = res.items;});
    }



    /* function runs when 'edit' or 'remove' icon is clicked. 'edit' uses GET BY ID to retrieve album info. Info is then patched to form control values
        * @id takes the id of the album
        * @action determines the action of the function, to either DELETE or UPDATE
    */
    private onClick(id: string, action: string) {
        if (action === 'edit') {
            this.tagService.GetTagById(id).subscribe((res: any) => {
                this.tagForm.patchValue(res.item); this.setStatus(res.item);
            })
        } else if (action === 'remove') {
            this.deleteSwal.show().then(res => {
                if (res.value) {
                    this.spinner.show();
                    this.tagService.Delete(id).subscribe((res: any) => {
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
            this.tagService.Update(this.status.id, this.tagForm.value).subscribe((res) => {
                this.refreshComponent()
                setTimeout(() => { this.spinner.hide() }, 1000);
                setTimeout(() => { this.successSwal.show(); }, 1000);
            })
        } else { //post
            this.tagService.Post(this.tagForm.value).subscribe(res => {
                this.refreshComponent();
                setTimeout(() => { this.spinner.hide() }, 1000);
                setTimeout(() => { this.successSwal.show(); }, 1000);
            })
        }

    }
    
}
