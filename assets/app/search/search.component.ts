import { Component, OnInit } from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "./search.service";
import {AuthService} from "../auth/auth.service";
import {AccountService} from "../account/account.service";
import {User} from "../auth/user.model";
import {Search} from "./search.model";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styles: [`
        div.searchmiddle{
            padding-top: 10px;
        }
        span{
            padding-top: 10px;
            padding-right: 15px;
        }
        li.searchMenu{
            padding-left: 40px;
            padding-right: 40px;
        }
        .userImg{
            border-radius: 70px;
        }
    `]
})

export class SearchComponent implements OnInit{
    myForm: FormGroup;
    keyword: string;
    username: string;
    image: string;
    search: Search={
        title: '',
        url: '',
        site: '',
        category: '',
        count: '',
        price: '',
        shop: ''
    };
    searches:Search[]=[];

    constructor(private searchService: SearchService, private authService: AuthService,
                private router: Router, private route: ActivatedRoute,
                private accountService: AccountService){
    }

    ngOnInit(){
        console.log('search ts init');
        this.myForm = new FormGroup({
            keyword: new FormControl(null, Validators.required)
        });

        this.keyword = this.route.params['_value'].keyword;

        this.searchService.saveKeyword(this.keyword);

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

        this.searchService.searchData()
            .subscribe(result => {
                console.log(result)
                console.log(result.obj[0]._source);
                //this.search = result.obj[0]._source;
                for(var i=0; i < result.obj.length; i++){
                    this.searches.push(new Search(
                        result.obj[i]._source.title,
                        result.obj[i]._source.url,
                        result.obj[i]._source.site,
                        result.obj[i]._source.category,
                        result.obj[i]._source.count,
                        result.obj[i]._source.price,
                        result.obj[i]._source.shop
                    ));
                }

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