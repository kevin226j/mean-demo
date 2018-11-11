import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';



@Component({
    selector: 'dropdown-component',
    template:
        `
        <div class = "form-group" [ngClass] = "{'error' : control.invalid && (control.dirty || control.touched)}">
            <ng-select class="custom" 
                [loading]="!items ? true : false" 
                [items] = "items" 
                [formControl] = "control"
                [markFirst] = "markFirst"
                (change) = "ngOnChanges()"
                [closeOnSelect] = "true"
                placeholder='{{placeholder}}'>
            </ng-select>
        </div>
    `,
    styles: [
        `
        .error {
            border: 1px solid #dc3545;
            border-radius: 20px;
            height: 45px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.Default
})


export class DropDownComponent implements OnChanges{
    @Input() control: AbstractControl;
    @Input() placeholder: string;
    @Input() items : any[];
    @Input() markFirst? : boolean;

    @Output() selection = new EventEmitter<any>();


    ngOnChanges() {
        let albumName = this.control.value;
        this.selection.emit({ albumName});
    }
}