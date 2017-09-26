import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "./account.service";
import {User} from "../auth/user.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
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
        #chgpwdform{
            margin: 10px;
            border-color: white;
        }
        .bottompart{
            text-align: center;
            color: red;
            font-style: italic;
        }
        #chgpwdbtn{
            width: 100%;
        }
        .rmvsidepadding{
            padding-left: 0;
            padding-right: 0;
        }
        .titleimg{
            width: 390px;
            height: 50px;
        }
    `]
})

export class PasswordComponent implements OnInit{
    errMsg: string = '';
    myForm: FormGroup;

    constructor(private accountService: AccountService, private router: Router){};

    confirmpwd(){
        const user = new User(localStorage.getItem('userId'), this.myForm.value.password)
        this.accountService.confirmPwd(user)
            .subscribe(result => {
                console.log(result);
                console.log(typeof result);
                if(result.obj === 'correct'){
                    this.router.navigateByUrl('/myAccount/password/reset');
                }
                else{
                    this.errMsg ='Please confirm your password!';
                    console.log(this.errMsg);
                }
            }
            , err=> {console.log(err);console.log('is it here?')});
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            password: new FormControl(null, Validators.required)
        })
    }
}