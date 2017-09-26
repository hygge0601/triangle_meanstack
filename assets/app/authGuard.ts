import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth/auth.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(){
        if(this.authService.isSignnedIn()){
            return Observable.of(true);
        }
        this.router.navigate(['/auth/signin']);
        return Observable.of(false);
    }
}