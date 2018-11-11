import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef, HostListener, DoCheck } from '@angular/core';
import { AbstractControl } from '@angular/forms';


class imageSnippet {
    constructor(public src: string, public file: File) { }
}

@HostListener('window:resize', ['$event'])

@Component({
    selector: 'upload-component',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit, DoCheck {
    public fileName: string;
    public selectedItem: any;
    public innerWidth: any;
    public selectedFile : imageSnippet;

    @Input() control: AbstractControl;
    @Input() edit?: boolean;
    @Output() returnFile = new EventEmitter<any>();


    constructor(private cd: ChangeDetectorRef) { }


    //

    //Remove Item from the input, while updating controlName
    private removeImage() {
        this.fileName = null;
        this.control.reset();
    }

    //Process file input
    public processFile(event: any): void {

        if (event.target.files && event.target.files.length) {

            const [file] = event.target.files;

            const reader = new FileReader();

            reader.onload = (e:any) => {
                this.control.patchValue({
                    image: reader.result
                })
                
                this.fileName = file.name;
                this.selectedFile = new imageSnippet(e.target.result,file)

                //return uploaded file
                
                this.returnFile.emit(this.selectedFile);
            }
            this.cd.markForCheck();
            reader.readAsDataURL(file);
        }


    }
    //Check for display screen size
    ngOnInit() {
        this.innerWidth = window.innerWidth;
    }

    ngDoCheck() {
        if (typeof this.control.value !== 'object' && this.control.value !== null && !this.control.value.match('[A-Za-z_.-]')) {
            this.fileName = this.control.value
        }
    }

}