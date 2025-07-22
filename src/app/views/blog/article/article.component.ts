import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArticleService } from '../../../shared/services/article.service';
import { ArticleType } from '../../../../assets/types/article.type';
import { ActivatedRoute } from '@angular/router';
import { DefaultResponseType } from '../../../../assets/types/default-response.type';
import { AuthService } from '../../../core/auth/auth.service';
import { CommentsService } from '../../../shared/services/comments.service';
import {
  CommentType,
  MoreCommentType,
} from '../../../../assets/types/comment.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CommentActionEnumType,
  CommentActionType,
} from '../../../../assets/types/comment-action.type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit {
  protected relatedArticles: ArticleType[] = [];

  private url: string = '';
  protected article: ArticleType | null = null;
  protected isLogged: boolean = false;
  protected comments: CommentType[] = [];
  private sliceLengthForComments: number = 3;
  protected userCommentActions: CommentActionType[] = [];
  protected likedComments: string[] = [];
  protected dislikedComments: string[] = [];
  private visibleCommentsCount: number = 0;
  //protected likedComments: string[] =[];

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private commentsService: CommentsService,
    private _snackBar: MatSnackBar
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
            if (this.article.comments && this.article.comments.length > 0) {
              this.comments = this.article.comments;
              this.visibleCommentsCount = this.comments.length;
            }
            this.processArticleComments();
          });

        this.getRelatedArticles();

        if (this.authService.getIsLoggedIn()) {
          this.isLogged = true;
        }
      }
    });
  }

  getRelatedArticles(): void {
    if (this.url) {
      this.articleService
        .getRelatedArticles(this.url)
        .subscribe((data: ArticleType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          this.relatedArticles = data as ArticleType[];
        });
    }
  }

  getMoreComments(): void {
    if (
      this.article?.id &&
      this.article?.commentsCount &&
      this.article?.commentsCount > this.comments.length
    ) {
      this.commentsService
        .getComments(this.article?.id, this.comments.length)
        .subscribe((data) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          const nextSliceComments: CommentType[] = [
            ...(data as MoreCommentType).comments,
          ].slice(0, this.sliceLengthForComments);
          if (nextSliceComments.length > 0) {
            this.comments = this.comments.concat(nextSliceComments);
            this.visibleCommentsCount = this.comments.length;
          }
        });
    }
  }

  addComment(): void {
    const textAreaElem: HTMLElement | null =
      document.getElementById('comment-input');

    if (textAreaElem) {
      const text: string = (textAreaElem as HTMLInputElement).value;
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

  private getComments(): void {
    if (this.article?.id) {
      this.commentsService
        .getComments(this.article?.id)
        .subscribe((data: MoreCommentType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          const moreComments: MoreCommentType = data as MoreCommentType;
          if (moreComments.allCount > this.comments.length) {
            const gettingComments = moreComments.comments;
            this.comments = moreComments.comments.slice(
              0,
              Math.max(this.sliceLengthForComments, this.visibleCommentsCount)
            );
          }
        });
    }
  }

  protected likeComment(idComment: string): void {
    console.log(idComment);
    if (idComment) {
      this.commentsService
        .addActionToComment(idComment, CommentActionEnumType.like)
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            throw new Error(data.message);
          }
          const updateAllComents: boolean = true;
          this.processArticleComments(updateAllComents);
          this._snackBar.open('Ваш голос учтен');
        });
    }
  }

  protected dislikeComment(idComment: string): void {
    if (idComment) {
      this.commentsService
        .addActionToComment(idComment, CommentActionEnumType.dislike)
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            throw new Error(data.message);
          }
          const updateAllComents: boolean = true;
          this.processArticleComments(updateAllComents);
          this._snackBar.open('Ваш голос учтен');
        });
    }
  }

  protected violateComment(idComment: string): void {
    if (idComment) {
      this.commentsService
        .addActionToComment(idComment, CommentActionEnumType.violate)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              throw new Error(data.message);
            } else {
              this._snackBar.open('Жалоба отправлена');
            }
          },
          error: (err) => {
            if (err instanceof HttpErrorResponse && err.status === 400) {
              this._snackBar.open('Жалоба уже отправлена');
            } else {
              console.error('Ошибка при отправке жалобы:', err);
            }
          },
        });
    }
  }

  private processArticleComments(isUpdateAllComments: boolean = false): void {
    if (this.article?.id) {
      this.commentsService
        .getArticleCommentActions(this.article?.id)
        .subscribe((data: DefaultResponseType | CommentActionType[]) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          this.userCommentActions = data as CommentActionType[];
          this.likedComments = [];
          this.dislikedComments = [];
          for (let i = 0; i < this.userCommentActions.length; i++) {
            const commentAction = this.userCommentActions[i];
            switch (commentAction.action) {
              case CommentActionEnumType.like:
                this.likedComments.push(commentAction.comment);
                break;
              case CommentActionEnumType.dislike:
                this.dislikedComments.push(commentAction.comment);
                break;
              default:
                break;
            }
          }
          if (isUpdateAllComments) {
            this.getComments();
          }
        });
    }
  }
}
