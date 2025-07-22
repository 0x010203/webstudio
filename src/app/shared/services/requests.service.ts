import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultResponseType } from '../../../assets/types/default-response.type';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserRequestType } from '../../../assets/types/user-request.type';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

      sendRequest(request: UserRequestType) : Observable<DefaultResponseType>
      {
        //console.log(request);
        return this.http.post<DefaultResponseType>(environment.api+'requests', request);
      }
  
}
