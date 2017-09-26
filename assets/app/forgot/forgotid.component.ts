import {Component, OnInit} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {ForgotService} from "./forgot.service";
import {Forgot} from "./forgot.model";

@Component({
    selector: 'app-forgotid',
    templateUrl: './forgotid.component.html',
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
        #confirmail{
            width: 100%;
        }
    `]
})
export class ForgotidComponent implements OnInit{
    errMsg: String;
    myForm: FormGroup;

    constructor(private forgotService: ForgotService, private router: Router){};

    confirmail(){
        const user = new Forgot('', this.myForm.value.email);
        this.forgotService.confirmMail(user)
            .subscribe(result => {
                console.log(result);
                if(result.obj === 'success'){
                    this.router.navigate(['/forgot/id/result', {email: result.email}]);
                }
            }, error => {
                console.log(error);
                this.errMsg = error.error.message;
            });
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            email: new FormControl(null, Validators.required)
        })
    }
}