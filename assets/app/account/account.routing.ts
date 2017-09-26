import { Routes } from "@angular/router";
import {PasswordComponent} from "./password.component";
import {PrivateComponent} from "./private.component";
import {ActivityComponent} from "./activity.component";
import {DeleteComponent} from "./delete.component";
import {MyComponent} from "./my.component";
import {ResetpwdComponent} from "./resetpwd.component";
import {AuthGuard} from "../authGuard";

export const ACCOUNT_ROUTES: Routes = [
    { path: '', component: MyComponent, canActivate: [AuthGuard]},
    { path: 'password', component: PasswordComponent, canActivate: [AuthGuard]},
    { path: 'password/reset', component: ResetpwdComponent, canActivate: [AuthGuard]},
    { path: 'private', component: PrivateComponent, canActivate: [AuthGuard]},
    { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard]},
    { path: 'delete', component: DeleteComponent, canActivate: [AuthGuard]}
];