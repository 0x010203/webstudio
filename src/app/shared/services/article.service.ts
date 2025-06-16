import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleType } from '../../../assets/types/article.type';
import { DefaultResponseType } from '../../../assets/types/default-response.type';
import { environment } from '../../../environments/environment';
import { ActiveParamsType } from '../../../assets/types/active-params.type';
import { ArticlesResponseType } from '../../../assets/types/articles-response.type';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getTopArticles() : Observable<ArticleType[] | DefaultResponseType>
  {
    return this.http.get<ArticleType[] | DefaultResponseType>(environment.api+'articles/top');
  }

  getArticles(params: ActiveParamsType) : Observable<ArticlesResponseType | DefaultResponseType>
  {
    return this.http.get<ArticlesResponseType | DefaultResponseType>(environment.api+'articles', {params: params});
  }

  getRelatedArticles(url: string) : Observable<ArticleType[] | DefaultResponseType>
  {
    return this.http.get<ArticleType[] | DefaultResponseType>(environment.api+'articles/related/'+url);
  }

  getArticle(url:string): Observable<ArticleType | DefaultResponseType>
  {
    return this.http.get<ArticleType | DefaultResponseType>(environment.api+'articles/'+url);
  }


}
