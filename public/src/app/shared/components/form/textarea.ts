import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'textarea-component',
    template:
        `
        <div class = "form-group" 
            [ngClass] = "{'error' : control.invalid && (control.dirty || control.touched)}">
            <textarea type="text" [formControl] = "control"  class="form-control" name="{{control.parent}}" rows = "{{rows}}" placeholder="{{placeholder}}" required></textarea>
        </div>
    `,
    styles: [
        `
        .error {
            border: 1px solid #dc3545;
            border-radius: 20px;
        }
        .error p {
            text-color: #dc3545;
        }
    `]
})

export class TextAreaComponent {
    @Input() control: AbstractControl;
    @Input() placeholder: string;
    @Input() rows: number;
}