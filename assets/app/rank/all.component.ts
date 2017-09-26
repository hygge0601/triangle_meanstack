import {Component, Input, OnInit} from "@angular/core";
import {Rank} from "./rank.model";
import { RankService } from "../rank/rank.service";

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
        .rankData{
            padding-left: 40px;
        }
    `]
})
export class AllComponent implements OnInit{
    keyword: string ='';
    rankes: Rank[]=[];

    constructor(private rankService: RankService){}

    ngOnInit(){
        console.log('all ts init');
        this.keyword = this.rankService.getKeyword();

        this.rankService.getAlls()
            .subscribe(result => {
            console.log(result);
            for(var i=0;i<result.obj.length;i++){
                this.rankes.push(new Rank(
                    i + 1,
                    result.obj[i].title,
                    result.obj[i].url,
                    result.obj[i].site,
                    result.obj[i].category,
                    result.obj[i].count,
                    result.obj[i].img
                ));
            }
        }, error => console.log(error));
    }
}