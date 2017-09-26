import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";
import {AccountService} from "../account/account.service";

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styles: [`
        .userImg{
            border-radius: 70px;
        }
    `]
})
export class ForgotComponent {
    username: string;
    image: string;

    constructor(private authService: AuthService, private accountService: AccountService,
                private router: Router){};

    ngOnInit(){
        const user = new User(localStorage.getItem('userId'), '');
        this.accountService.findAccount(user)
            .subscribe(result => {
                    console.log(result);
                    this.username = result.obj.last + ' ' + result.obj.first;
                    this.image = result.obj.img;
                }
                ,error=> console.log(error));
    }

    isSignnedIn(){
        return this.authService.isSignnedIn();
    }

    onSignout() {
        this.authService.signout();
        this.router.navigateByUrl('/');
    }
}