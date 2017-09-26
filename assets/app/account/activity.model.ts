export class Activity {
    keyword: string;
    date?: Date;
    no1?: string;
    no1_url?: string;
    no2?: string;
    no2_url?: string;
    no3?: string;
    no3_url?: string;

    constructor(keyword: string, date: Date,
                no1: string, no1_url: string,
                no2: string, no2_url: string,
                no3: string, no3_url: string){
        this.keyword = keyword;
        this.date = date;
        this.no1 = no1;
        this.no1_url = no1_url;
        this.no2 = no2;
        this.no2_url = no2_url;
        this.no3 = no3;
        this.no3_url = no3_url;
    }
}