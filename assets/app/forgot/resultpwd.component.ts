import { Component } from "@angular/core";
import { ForgotService } from "./forgot.service";
import { Forgot } from "./forgot.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-resultpwd',
    templateUrl: './resultpwd.component.html'
})
export class ResultpwdComponent{
    mail: string= '';

    constructor(private forgotService: ForgotService, private route: ActivatedRoute){};

    ngOnInit(){
        this.mail = this.route.params['_value'].email;
    }
}