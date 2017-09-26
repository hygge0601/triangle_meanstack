import {Injectable} from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class RankService {
    keyword: string = '';

    constructor(private http: Http) {}

    saveKeyword(keyword){
        this.keyword = keyword;
    }
    getKeyword(){
        return this.keyword;
    }

    //get rank data(search)
    getAlls(){
        return this.http.get('http://localhost:3000/json/getAll')
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }

    getAuction(){
        return this.http.get('http://localhost:3000/json/getAuction')
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }
    getTimon(){
        return this.http.get('http://localhost:3000/json/getTimon')
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }
    getG9(){
        return this.http.get('http://localhost:3000/json/getG9')
            .map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
    }
}