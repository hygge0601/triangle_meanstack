import {Component, OnInit} from "@angular/core";
import {ForgotService} from "./forgot.service";
import {Forgot} from "./forgot.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-resultid',
    templateUrl: './resultid.component.html',
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
        
    `]
})
export class ResultidComponent implements OnInit{
    mail: string='';

    constructor(private route: ActivatedRoute){};

    ngOnInit(){
        var reMail = this.route.params['_value'].email;
        this.mail = reMail.substring(0,2) + '***@' + reMail.split('@')[1];
    }

}