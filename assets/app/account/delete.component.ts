import { Component } from "@angular/core";
import {AccountService} from "./account.service";
import {User} from "../auth/user.model";

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
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

export class DeleteComponent{

    constructor(private accountService: AccountService){}

    onDelete(){
        const user = new User(localStorage.getItem('userId'), 'default');
        this.accountService.deleteAccount(user)
            .subscribe(result => console.log(result)
            );
    }
}