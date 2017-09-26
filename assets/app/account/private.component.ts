import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AccountService} from "./account.service";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {User} from "../auth/user.model";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-private',
    templateUrl: './private.component.html',
    styles: [`
        .bannerheader{
            background-image: url('../../images/uni_banner.png');
            text-align: center;
            font-size: 30px;
            color: white;
            font-weight: bold;
            height: 80px;
            display: block;
            padding: 19px;
        }
        .image-upload{
            text-align: center;
            
        }
        .upload-btn{
            width: 100%;
        }
        .upload-btn > input{
            display: none;
        }
        .submit-btn > button{
            width: 40%;
            margin: 5px;
        }
        .myinfo-btn{
            margin-top: 10px;
        }
        .myinfo-btn > button{
            text-align: center;
            width: 40%;
        }
        input#nameinput1, input#nameinput2, input#nameinput3{
            margin: 5px;
            display: inline-block;
        }
        input#nameinput1, input#nameinput2{
            width: 40%;
        }
        input#nameinput3{
            width: 84%;
        }
        .divtextcenter{
            text-align: center;
        }
    `]
})

export class PrivateComponent implements OnInit{
    @Input() user: User ={
        id: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        img: ''
    };
    filesToUpload: Array<File> = [];

    constructor(private accountService: AccountService, private router: Router, private http: Http){}

    upload(){
        var image = { id: '',img: ''};
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;

        formData.append("uploads[]", files[0], files[0]['name']);
        image.id = localStorage.getItem('userId');
        image.img = '/' + files[0]['name'];
        console.log(image);

        this.http.post('http://localhost:3000/upload', formData)
            .map(files=>files.json())
            .subscribe(files=>console.log('files', files))

        this.accountService.uploadImage(image)
            .subscribe(result => console.log(result), err => console.log(err)
            );
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    onEdit(){
        console.log('onEdit: ' + this.user);
        console.log(this.user.id);
        console.log(this.user.email);
        this.accountService.updateAccount(this.user)
            .subscribe(result => console.log(result), err => console.log(err)
            );
    }

    ngOnInit(){
        this.user.id = localStorage.getItem('userId');
        this.accountService.findAccount(this.user)
            .subscribe(result => {
                console.log(result);
                this.user.firstName = result.obj.first;
                this.user.lastName = result.obj.last;
                this.user.email= result.obj.email;
                this.user.img = result.obj.img;
                }
                , err => console.log(err)
            );
    }
}