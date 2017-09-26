import { Component } from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../auth/user.model";
import {AccountService} from "./account.service";

@Component({
    selector: 'app-accheader',
    templateUrl: './accheader.component.html',
    styles: [`
        .navbar-center{
            display: inline-block;
            float: none;
        }
        .navbar .navbar-collapse{
            text-align: center;
        }
        .userImg{
            border-radius: 70px;
        }
    `]
})
export class AccheaderComponent {
    username: string;
    image: string;

    constructor(private authService: AuthService, private accountService: AccountService,
                private router: Router){};

    onSignout(){
        this.authService.signout();
        this.router.navigate(['/auth', 'signin']);
    }

    isSignnedIn(){
        return this.authService.isSignnedIn();
    }

    ngOnInit(){
        const user = new User(localStorage.getItem('userId'), '');
        this.accountService.findAccount(user)
            .subscribe(result => {
                    console.log(result);
                    this.username = result.obj.first + ' ' + result.obj.last;
                    this.image = result.obj.img;
                }
                , error => console.log(error));
    }
}