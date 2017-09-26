import {Component, OnInit} from "@angular/core";
import {User} from "../auth/user.model";
import {AccountService} from "./account.service";
import {Activity} from "./activity.model";

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
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

export class ActivityComponent implements OnInit{
    activity: Activity ={
        keyword: '',
        date: new Date,
        no1: '',
        no1_url: '',
        no2: '',
        no2_url: '',
        no3: '',
        no3_url: ''
    }
    activities: Activity[] = [];

    constructor(private accountService: AccountService){}

    ngOnInit(){
        const token = new User(localStorage.getItem('userId'), 'default');
        this.accountService.onactivity(token)
            .subscribe(
                data => {
                    console.log(data);
                    console.log(data.keyword);
                    console.log(data.keyword.length);
                    console.log(data.keyword[0]);

                    console.log(typeof data);
                    console.log(typeof this.activity);

                    for(var i=0; i<data.keyword.length;i++){

                        this.activities.push(new Activity(
                            data.keyword[i],
                            data.date[i],
                            data.no1[i],
                            data.no1_url[i],
                            data.no2[i],
                            data.no2_url[i],
                            data.no3[i],
                            data.no3_url[i]
                        ));
                    }
                }
                ,
                error => console.error(error)
            );

    }
}