import {Component, OnInit} from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-authentication',
    template: `        
        <div class="row spacing">
           <router-outlet></router-outlet>
        </div>
    `
})
export class AuthenticationComponent{
    constructor(private authService: AuthService) {}

    isSignnedIn() {
        return this.authService.isSignnedIn();
    }
}