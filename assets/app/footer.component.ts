import { Component } from "@angular/core";

@Component({
    selector: 'app-footer',
    template: `        
        <!--<footer>-->
            <!--<div class="container">-->
                <!--<ul class="list-inline">-->
                    <!--<li class="list-inline-item">-->
                        <!--<a href="#">Home</a>-->
                    <!--</li>-->
                    <!--<li class="footer-menu-divider list-inline-item">&sdot;</li>-->
                    <!--<li class="list-inline-item">-->
                        <!--<a href="#about">About</a>-->
                    <!--</li>-->
                    <!--<li class="footer-menu-divider list-inline-item">&sdot;</li>-->
                    <!--<li class="list-inline-item">-->
                        <!--<a href="#services">Services</a>-->
                    <!--</li>-->
                    <!--<li class="footer-menu-divider list-inline-item">&sdot;</li>-->
                    <!--<li class="list-inline-item">-->
                        <!--<a href="#contact">Contact</a>-->
                    <!--</li>-->
                <!--</ul>-->
                <!--<p class="copyright text-muted small">Copyright © Triangle 2017. All Rights Reserved</p>-->
            <!--</div>-->
        <!--</footer>-->
    `,
    styles: [`
        footer{
            position: absolute;
            bottom: 0;
            background-color: #dddddd;
            height: 70px;
            width: 100%;
            text-align: center;
        }
        /*ul{*/
            /*position: absolute;*/
            /*bottom: 30px;*/
            /*left: 50%;*/
            /*transform: translateX(-50%);*/
        /*}*/
        /*p{*/
            /*position: absolute;*/
            /*bottom: 0;*/
            /*left: 50%;*/
            /*transform: translateX(-50%);*/
        /*}*/
    `]
})
export class FooterComponent{

}