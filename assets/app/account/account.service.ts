import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../auth/user.model";

@Injectable()
export class AccountService {
    constructor(private http: Http) {}

    //activity.component
    onactivity(user: User) {
        const body = JSON.stringify(user);
        console.log('activity body: ' + body);
        console.log(typeof body);
        const headers = new Headers({'content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/json/activity', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    //delete.component
    deleteAccount(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/json/delete', body, {headers: headers})
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }

    //private.component
    findAccount(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/json/find', body, {headers: headers})
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }

    //private.component
    updateAccount(user: User){
        console.log('acc service: ' + user);
        console.log(user.id);
        console.log(user.email);
        const body = JSON.stringify(user);
        console.log('body: ' + body);
        console.log(typeof body);
        const headers = new Headers({'content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/json/update', body, {headers: headers})
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }

    //private.component
    uploadImage(image){
        console.log('is it excute to uploadImage');
        const body = JSON.stringify(image);
        const headers = new Headers({'content-type': 'application/json'});
        return this.http.post('http://localhost:3000/json/image', body, {headers: headers})
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }

    //password.component
    confirmPwd(user){
        const body = JSON.stringify(user);
        const headers = new Headers({'content-type': 'application/json'});
        return this.http.post('http://localhost:3000/json/confirm', body, {headers: headers})
            .map((response: Response) => response.json()).catch((error: Response)=>Observable.throw(error.json()));
    }

    //resetpwd.component
    resetPwd(user){
        const body = JSON.stringify(user);
        const headers = new Headers(({'content-type': 'application/json'}));
        return this.http.post('http://localhost:3000/json/reset', body, {headers: headers})
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }
}