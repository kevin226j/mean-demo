import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';



@Component({
    selector: 'input-component',
    template:
        `
        <div class = "form-group" 
            [ngClass] = "{'error' : control.invalid && (control.dirty || control.touched)}">
            <input type="{{type}}" [formControl] = "control"  class="form-control" name = "{{control.parent}}" placeholder="{{placeholder}}" required>
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

export class InputComponent {
    @Input() type: string;
    @Input() control: AbstractControl;
    @Input() placeholder: string;
}