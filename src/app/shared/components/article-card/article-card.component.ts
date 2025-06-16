import { Component, Input, OnInit } from '@angular/core';
import { ArticleType } from '../../../../assets/types/article.type';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article!: ArticleType;
  //serverStaticPath: string = environment.serverStaticPath+'articles/'
   //currentHost: string = window.location.host;

  constructor(    private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
     //const segments = this.route.snapshot.url.map(segment => segment.path);
    //console.log('Segments:', segments); 
    //console.log(this.currentHost);
  }

navigate(): void{
  this.router.navigate(['/article/' + this.article.url]);
}

}
