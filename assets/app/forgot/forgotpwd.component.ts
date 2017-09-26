import {Component, OnInit} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ForgotService } from "./forgot.service";
import {Forgot} from "./forgot.model";

@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpwd.component.html',
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
export class ForgotpwdComponent implements OnInit{
    myForm: FormGroup;

    constructor(private forgotService: ForgotService, private router: Router){};

    ngOnInit(){
        this.myForm = new FormGroup({
            id: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required)
        });
    }

    confirmidmail(){
        const user = new Forgot(this.myForm.value.id, this.myForm.value.email);
        this.forgotService.confirmidmail(user)
            .subscribe(result => {
                console.log(result);
                if(result.obj == 'success'){
                    this.router.navigate(['/forgot/password/result', {email: result.email}]);
                }
            }
            , error => console.log(error));
    }
}