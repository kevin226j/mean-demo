import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';



@Component({
    selector: 'checkbox-component',
    template:
        `
        <div class = "form-group checkbox-container">
            <label>
                <input type="checkbox" name="isActive" [formControl] = "control" >
                {{caption}}
            </label>
        </div>
    `,
    styles: [
        `
        .checkbox-container{
        }
    `],
    changeDetection: ChangeDetectionStrategy.Default
})


export class CheckboxComponent {
    @Input() control: AbstractControl;
    @Input() caption: string;
}