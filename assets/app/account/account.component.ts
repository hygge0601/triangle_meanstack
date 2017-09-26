import { Component } from "@angular/core";

@Component({
    selector: 'app-account',
    template: `
        <app-accheader></app-accheader>
        <router-outlet></router-outlet>
    `
})

export class AccountComponent{
}