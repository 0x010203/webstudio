import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleType } from '../../../assets/types/article.type';
import { DefaultResponseType } from '../../../assets/types/default-response.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getTopArticles() : Observable<ArticleType[] | DefaultResponseType>
  {
    return this.http.get<ArticleType[] | DefaultResponseType>(environment.api+'articles/top');
  }
}
