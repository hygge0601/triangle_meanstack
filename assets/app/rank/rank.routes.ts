import { Routes } from "@angular/router";
import {AllComponent} from "./all.component";
import {AuctionComponent} from "./auction.component";
import {G9Component} from "./g9.component";
import {TimonComponent} from "./timon.component";

export const RANK_ROUTES: Routes = [
    { path: '', redirectTo: 'all', pathMatch: 'full'},
    { path: 'all', component: AllComponent },
    { path: 'auction', component: AuctionComponent},
    { path: 'g9', component: G9Component },
    { path: 'timon', component: TimonComponent }
];