import {Injectable} from "@angular/core";
import { Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class SearchService {
    keyword: string = '';

    constructor(private http: Http) {}

    saveKeyword(keyword){
        this.keyword = keyword;
    }
    getKeyword(){
        return this.keyword;
    }

    searchData(){
        const keyword = {
            type: 'keyword',
            keyword: this.keyword
        }
        const body = JSON.stringify(keyword);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/json/searchProduct', body, {headers: headers})
            .map((response: Response)=> response.json()).catch((error: Response) => Observable.throw(error.json()));
    }
}