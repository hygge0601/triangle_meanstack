import { Routes, RouterModule } from "@angular/router";
import {IndexComponent} from "./index/index.component";
import {SearchComponent} from "./search/search.component";
import {RankComponent} from "./rank/rank.component";
import {AccountComponent} from "./account/account.component";
import {ACCOUNT_ROUTES} from "./account/account.routing";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {AuthenticationComponent} from "./auth/authentication.component";
import {ForgotComponent} from "./forgot/forgot.component";
import {FORGOT_ROUTES} from "./forgot/forgot.routes";
import {RANK_ROUTES} from "./rank/rank.routes";

const APP_ROUTES: Routes = [
    { path: '', component: IndexComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'search', component: SearchComponent},
    { path: 'rank', component: RankComponent, children: RANK_ROUTES},
    { path: 'myAccount', component: AccountComponent, children: ACCOUNT_ROUTES },
    { path: 'forgot', component: ForgotComponent, children: FORGOT_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);