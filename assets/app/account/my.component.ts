import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {AccountService} from "./account.service";
import {User} from "../auth/user.model";

@Component({
    selector: 'app-my',
    templateUrl: './my.component.html',
    styles: [`
        body,
        html {
            width: 100%;
            height: 100%;
        }

        body, h1, h2, h3, h4, h5, h6 {
            font-family: "Lato","Helvetica Neue",Helvetica,Arial,sans-serif;
            font-weight: 700;
        }
        .intro-header {
            padding-top: 50px; /* If you're making other pages, make sure there is 50px of padding to make sure the navbar doesn't overlap content! */
            padding-bottom: 50px;
            text-align: center;
            color: #f8f8f8;
            background: url("../../images/myAccount.jpg") no-repeat center center;
            background-size: cover;
            height: auto;
        }
        ul.intro-social-buttons > li {
            display: inline-flex;
            margin-bottom: 20px;
            padding: 0;
        }

        .intro-message {
            position: relative;
            padding-top: 5%;
            padding-bottom: 20%;
        }

        .intro-message > h1 {
            margin: 0;
            text-shadow: 2px 2px 3px rgba(0,0,0,0.6);
            font-size: 5em;
        }

        .intro-divider {
            width: 400px;
            border-top: 1px solid #f8f8f8;
            border-bottom: 1px solid rgba(0,0,0,0.2);
        }

        .intro-message > h3 {
            text-shadow: 2px 2px 3px rgba(0,0,0,0.6);
        }
        
        #mymenu1,
        #mymenu2,
        #mymenu3,
        #mymenu4{
            color: #333;
            background-color: #fff;
            border-color: #ccc;
            margin-left: 5px;
            margin-right: 5px;
        }
    `]
})

export class MyComponent{

}