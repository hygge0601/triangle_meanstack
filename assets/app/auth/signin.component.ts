import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styles: [`
        .titleimg{
            width: 100%;
        }
        .signin-btn{
            width: 100%;
        }
        .signlist{
            text-align: center;
        }
        h5{
            color: red;
            font-weight: lighter;
            font-style: italic;
        }
    `]
})
export class SigninComponent {
    errMsg: String;
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        const user = new User(this.myForm.value.id, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/myAccount');
                },
                error => {
                    console.error(error);
                    this.errMsg = error.error.message;
                }
            );
        console.log(localStorage);
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            id: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }
}