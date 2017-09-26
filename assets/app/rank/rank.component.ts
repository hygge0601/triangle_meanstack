import { Component, OnInit } from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RankService} from "./rank.service";
import {Rank} from "./rank.model";
import {AuthService} from "../auth/auth.service";
import {AccountService} from "../account/account.service";
import {User} from "../auth/user.model";

@Component({
    selector: 'app-rank',
    templateUrl: './rank.component.html',
    styles: [`
        div.rankmiddle{
            padding-top: 10px;
        }
        span{
            padding-top: 10px;
            padding-right: 15px;
        }
        li.rankMenu{
            padding-left: 40px;
            padding-right: 40px;
        }
        .userImg{
            border-radius: 70px;
        }
    `]
})

export class RankComponent implements OnInit{
    myForm: FormGroup;
    keyword: string;
    username: string;
    image: string;
    rank: Rank ={
        title: '',
        site: '',
        category: '',
        count: '',
        url: '',
        img: ''
    };
    rankes: Rank[] = [];

    constructor(private rankService: RankService, private authService: AuthService,
                private router: Router, private route: ActivatedRoute,
                private accountService: AccountService){
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            keyword: new FormControl(null, Validators.required)
        });

        this.keyword = this.route.params['_value'].keyword;

        this.rankService.saveKeyword(this.keyword);

        //get userinfo
        if(localStorage.getItem('userId')){
            const user = new User(localStorage.getItem('userId'), '');
            this.accountService.findAccount(user)
                .subscribe(result => {
                        console.log(result);
                        this.username = result.obj.last + ' ' + result.obj.first;
                        this.image = result.obj.img;
                    }
                    , error => console.log(error));
        }
    }

    onSubmit(){
        this.keyword = this.myForm.value.keyword;
        this.rankService.saveKeyword(this.keyword);
        console.log(this.keyword);
        this.rankService.getAlls()
            .subscribe(result => {
                console.log(result);
                for(var i=0;i<result.obj.length;i++){
                    this.rankes.push(new Rank(
                        i + 1,
                        result.obj[i].title,
                        result.obj[i].url,
                        result.obj[i].site,
                        result.obj[i].category,
                        result.obj[i].count
                    ));
                }
                this.router.navigate(['/search', {keyword: this.keyword}]);
            }, error => console.log(error));
    }

    isSignnedIn(){
        return this.authService.isSignnedIn();
    }

    onSignout() {
        this.authService.signout();
        this.router.navigateByUrl('/');
    }
}