import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentsResponseType } from '../../../assets/types/comments-response.type';
import { DefaultResponseType } from '../../../assets/types/default-response.type';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments(
    article: string,
    offset: number = 0
  ): Observable<CommentsResponseType | DefaultResponseType> {
    return this.http.get<CommentsResponseType | DefaultResponseType>(
      environment.api + 'comments',
      { params: { offset, article } }
    );
  }
  addComment(article: string, text: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(
      environment.api + 'comments',
      {
        text: text,
        article: article,
      },
      { withCredentials: true}
    );
  }
}
