import { Routes } from "@angular/router";
import {ForgotidComponent} from "./forgotid.component";
import {ForgotpwdComponent} from "./forgotpwd.component";
import {ResultidComponent} from "./resultid.component";
import {ResultpwdComponent} from "./resultpwd.component";

export const FORGOT_ROUTES: Routes = [
    { path: 'id', component: ForgotidComponent },
    { path: 'password', component: ForgotpwdComponent },
    { path: 'id/result', component: ResultidComponent },
    { path: 'password/result', component: ResultpwdComponent }
];