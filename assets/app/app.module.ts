import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NglModule } from 'ng-lightning';

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import {IndexComponent} from "./index/index.component";
import {SignupComponent} from "./auth/signup.component";
import {SearchComponent} from "./search/search.component";
import {AccountComponent} from "./account/account.component";
import {PasswordComponent} from "./account/password.component";
import {PrivateComponent} from "./account/private.component";
import {ActivityComponent} from "./account/activity.component";
import {DeleteComponent} from "./account/delete.component";
import {AccheaderComponent} from "./account/accheader.component";
import {MyComponent} from "./account/my.component";
import {AuthService} from "./auth/auth.service";
import {SigninComponent} from "./auth/signin.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {AccountService} from "./account/account.service";
import {SearchService} from "./search/search.service";
import {ForgotComponent} from "./forgot/forgot.component";
import {ForgotidComponent} from "./forgot/forgotid.component";
import {ForgotpwdComponent} from "./forgot/forgotpwd.component";
import {ResetpwdComponent} from "./account/resetpwd.component";
import {ForgotService} from "./forgot/forgot.service";
import {ResultidComponent} from "./forgot/resultid.component";
import {ResultpwdComponent} from "./forgot/resultpwd.component";
import {AppheaderComponent} from "./appheader.component";
import {FooterComponent} from "./footer.component";
import {AllComponent} from "./rank/all.component";
import {AuctionComponent} from "./rank/auction.component";
import {G9Component} from "./rank/g9.component";
import {TimonComponent} from "./rank/timon.component";
import {RankService} from "./rank/rank.service";
import {RankComponent} from "./rank/rank.component";
import {AuthGuard} from "./authGuard";

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        IndexComponent,
        AuthenticationComponent,
        SigninComponent,
        SignupComponent,
        SearchComponent,
        RankComponent,
        AllComponent,
        AuctionComponent,
        G9Component,
        TimonComponent,
        AccountComponent,
        MyComponent,
        PasswordComponent,
        ResetpwdComponent,
        PrivateComponent,
        ActivityComponent,
        DeleteComponent,
        AccheaderComponent,
        ForgotComponent,
        ForgotidComponent,
        ForgotpwdComponent,
        ResultidComponent,
        ResultpwdComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        NglModule.forRoot()
    ],
    providers: [
        AuthService,
        AuthGuard,
        AccountService,
        SearchService,
        RankService,
        ForgotService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {

}