import {Directive, Input, Output, HostListener,EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
    selector : '[tsSubmitIfValid]'
})

export class SubmitFormIfValidDirective {
    @Input('tsSubmitIfValid') formRef: FormGroup;
    @Output() valid = new EventEmitter <void> ();

    constructor() {}

    @HostListener('click') 
    handleClick() {
        this.markFieldAsDirty();
        this.emitIfValid();
    }

    private markFieldAsDirty() {
        Object.keys(this.formRef.controls).forEach(fieldName => {
            this.formRef.controls[fieldName].markAsDirty();
        })
    }

    private emitIfValid() {
        if(this.formRef.valid)
            this.valid.emit();
    }

}