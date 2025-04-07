import { Component, Input, OnInit } from '@angular/core';
import { ArticleType } from '../../../../assets/types/article.type';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article!: ArticleType;
  serverStaticPath: string = environment.serverStaticPath+'articles/'

  constructor(    private router : Router) { }

  ngOnInit(): void {
  }

}
