import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class ForgotService{

    constructor(private http: Http){};

    //forgotid.component
    confirmMail(user){
        console.log(user);
        const body = JSON.stringify(user);
        console.log(body);
        const headers = new Headers({'content-type': 'application/json'});
        return this.http.post('http://localhost:3000/json/confirmail', body, {headers: headers})
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }

    //forgotpassword.component
    confirmidmail(user){
        const body = JSON.stringify(user);
        const headers = new Headers({'content-type': 'application/json'});
        return this.http.post('http://localhost:3000/json/confirmidmail', body, {headers: headers})
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }

    //resultpwd.component
}