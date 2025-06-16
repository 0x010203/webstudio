import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArticleService } from '../../../shared/services/article.service';
import { ArticleType } from '../../../../assets/types/article.type';
import { ActivatedRoute } from '@angular/router';
import { DefaultResponseType } from '../../../../assets/types/default-response.type';
import {
  catchError,
  concatMap,
  EMPTY,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { CommentsService } from '../../../shared/services/comments.service';
import { CommentsResponseType } from '../../../../assets/types/comments-response.type';
import { CommentType } from '../../../../assets/types/comment.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit {
  public relatedArticles: ArticleType[] = [];

  public url: string = '';
  public article: ArticleType | null = null;
  public isLogged: boolean = false;
  public comments: CommentType[] = [];

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private commentsService: CommentsService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['url']) {
        this.url = params['url'];
        this.articleService
          .getArticle(this.url)
          .subscribe((data: ArticleType | DefaultResponseType) => {
            if ((data as DefaultResponseType).error !== undefined) {
              throw new Error((data as DefaultResponseType).message);
            }
            this.article = data as ArticleType;
            //console.log(this.article);
            this.commentsService
              .getComments(this.article.id)
              .subscribe((data: CommentsResponseType | DefaultResponseType) => {
                if ((data as DefaultResponseType).error !== undefined) {
                  throw new Error((data as DefaultResponseType).message);
                }
                this.comments = (data as CommentsResponseType).comments;
                console.log(this.comments);
              });
          });

        if (this.url) {
          this.articleService
            .getRelatedArticles(this.url)
            .subscribe((data: ArticleType[] | DefaultResponseType) => {
              if ((data as DefaultResponseType).error !== undefined) {
                throw new Error((data as DefaultResponseType).message);
              }
              this.relatedArticles = data as ArticleType[];
            });
          this.getComments();
        }

        if (this.authService.getIsLoggedIn()) {
          this.isLogged = true;
        }
      }
    });
    //console.log(this.isLogged);
    //   this.activatedRoute.params
    //     .pipe(
    //       // Проверяем наличие параметра 'url'
    //       filter((params) => !!params['url']),

    //       // Извлекаем URL
    //       map((params) => params['url']),

    //       // Получение основной статьи
    //       switchMap((url) => this.articleService.getArticle(url)),

    //       // Обрабатываем возможные ошибки сервиса
    //       catchError((err) => {
    //         console.error('Ошибка загрузки статьи:', err.message); // Можно показать сообщение пользователю
    //         return EMPTY; // Продолжаем цепочку без дальнейших действий
    //       }),

    //       // Получили статью успешно
    //       tap((article) => {
    //         console.log(article);
    //         this.article = article as ArticleType;

    //       }),

    //       // Получение связанных статей
    //       switchMap(() =>{
    //         if (this.article?.url) {this.articleService.getRelatedArticles(this.article.url)}
    //       }

    //       ),

    //       // Обрабатываем ошибки второго API-запроса
    //       catchError((err) => {
    //         console.error('Ошибка загрузки связанных статей:', err.message);
    //         return EMPTY;
    //       })
    //     )
    //     .subscribe((relatedArticles) => {
    //       this.relatedArticles = relatedArticles;
    //     });
    //   //console.log(this.url);

    //this.isLogged = this.authService.getIsLoggedIn();
  }

  // getRelatedArticles(): void {
  //   if (this.url){
  //     this.articleService.getRealtedArticles(this.url)
  //     .subscribe((data: ArticleType[] | DefaultResponseType)=>{
  //       if ((data as DefaultResponseType).error !== undefined) {
  //         throw new Error((data as DefaultResponseType).message);
  //       }
  //       this.relatedArticles = data as ArticleType[];
  //     })
  //   }
  // }

  addComment(): void {
    const textAreaElem: HTMLElement | null =
      document.getElementById('comment-input');

    if (textAreaElem) {
      const text: string = (textAreaElem as HTMLInputElement).value;
      //console.log(text);
      if (text && this.article && this.article.id) {
        this.commentsService
          .addComment(this.article.id, text)
          .subscribe((data: DefaultResponseType) => {
            if (data.error) {
              throw new Error(data.message);
            }
          });
        (textAreaElem as HTMLInputElement).value = '';
        this._snackBar.open('Ваш комментарий опубликован');  
        this.getComments();
      }
    }
  }

  getComments(): void {
    if (this.article?.id) {
      this.commentsService.getComments(this.article?.id).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
