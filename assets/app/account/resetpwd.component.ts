import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "./account.service";
import {User} from "../auth/user.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-resetpwd',
    templateUrl: './resetpwd.component.html',
    styles: [`
        .bannerheader{
            background-image: url('../../images/uni_banner.png');
            text-align: center;
            font-size: 30px;
            color: white;
            font-weight: bold;
            height: 80px;
            display: block;
            padding: 19px;
        }
        .resetpwd-btn{
            text-align: center;
        }
        .resetpwd-btn > button{
            width: 84%;
        }
        .resiz-inp{
            text-align: center;
        }
        .resiz-inp > input{
            display: inline-block;
            width: 84%;
            margin-bottom: 10px;
        }
    `]
})

export class ResetpwdComponent implements OnInit{
    errMsg: string ='';
    myForm: FormGroup;

    constructor(private accountService: AccountService, private router: Router){};

    resetPwd(){
        const user = new User(localStorage.getItem('userId'), this.myForm.value.password1);
        if(this.myForm.value.password1 === this.myForm.value.password2){
            this.accountService.resetPwd(user)
                .subscribe(result => {
                        console.log(result);
                        if(result.obj === 'success'){
                            this.router.navigateByUrl('/');
                        }

                    }
                    , error => console.log(error));
        }
        else{
            this.errMsg ='Please confirm! two passwords is not synchronized'
            console.log(this.errMsg);
        }
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            password1: new FormControl(null, Validators.required),
            password2: new FormControl(null, Validators.required),
        })
    }
}