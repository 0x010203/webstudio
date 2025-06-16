import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleCategoryType } from '../../../assets/types/article-category.type';
import { DefaultResponseType } from '../../../assets/types/default-response.type';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  

   constructor(private http: HttpClient) { }
  
    getCategories() : Observable<ArticleCategoryType[] | DefaultResponseType>
    {
      return this.http.get<ArticleCategoryType[] | DefaultResponseType>(environment.api+'categories');
    }
  
  
}
