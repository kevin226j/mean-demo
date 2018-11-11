import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector :'login-component',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    public loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public authService: AuthService,private router: Router, private spinner: NgxSpinnerService) {
        this.buildForm(); 
    }

    private buildForm(){
        this.loginForm = this.formBuilder.group({
            username: this.formBuilder.control(null, [Validators.required, Validators.email]),
            password: this.formBuilder.control(null, [Validators.required, Validators.min(8)])
        })
    }

    public ngOnInit() {
        if(this.authService.isLoggedIn() === true){
            this.router.navigateByUrl('/home');
        }
    }

    public login() {
        const {username, password} = this.loginForm.value;
        this.spinner.show();
        this.authService.login(username, password).subscribe((res:any)=> {
                this.spinner.hide();
                (res === false) ? this.router.navigateByUrl('/error') : window.location.href = 'home';
        })

    }
}