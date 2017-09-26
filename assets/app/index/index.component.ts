import { Component, OnInit } from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Params, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {AccountService} from "../account/account.service";
import {User} from "../auth/user.model";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styles: [`
        img{
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
        span#searchicon{            
            margin-right: 15px;
        }
        .userImg{
            border-radius: 70px;
        }
    `]
})

export class IndexComponent implements OnInit{
    myForm: FormGroup;
    username: string;
    image: string;

    constructor(private authService: AuthService, private accountService: AccountService,
                private router: Router){}

    onSubmit(){
        console.log(this.myForm.value.keyWord);
        var keyword = this.myForm.value.keyWord;
        this.router.navigate(['/search', {keyword: keyword}]);
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            keyWord: new FormControl(null, Validators.required)
        });

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