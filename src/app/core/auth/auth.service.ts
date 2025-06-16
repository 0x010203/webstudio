import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DefaultResponseType } from '../../../assets/types/default-response.type';
import { LoginResponseType } from '../../../assets/types/login-response.type';
import { UserInfoType } from '../../../assets/types/user-info.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenKey: string = 'accessToken';
  public refreshTokenKey: string = 'refreshToken';
  public userIdKey: string = 'userId';
  public userName: string = 'defaultUser';

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
    //проверяем сразу, залогинен пользоваетль или нет
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
   }

  login(email: string, password: string, rememberMe: boolean) : Observable<DefaultResponseType | LoginResponseType>{
    return this.http.post<DefaultResponseType | LoginResponseType>(environment.api+'login', {
      email, password, rememberMe
    });
  };

  signup(name: string, email: string, password: string) : Observable<DefaultResponseType | LoginResponseType>{
    return this.http.post<DefaultResponseType | LoginResponseType>(environment.api+'signup', {
      name, email, password
    });
  };

  logout() : Observable<DefaultResponseType>{
    const tokens : {accessToken: string | null, refreshToken: string | null} = this.getTokens();

    if (tokens && tokens.refreshToken){
      return this.http.post<DefaultResponseType>(environment.api+'logout', {refreshToken: tokens.refreshToken});
    }
    
    throw throwError(()=>'Can not find token');
  }

  refresh(): Observable<DefaultResponseType|LoginResponseType >{
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken){
      return this.http.post<DefaultResponseType|LoginResponseType >(environment.api+'refresh', {refreshToken: tokens.refreshToken});
    }
    throw throwError(()=>'Can not use token');
  }

  public getIsLoggedIn(): boolean{
    return this.isLogged;
  }

  public setTokens(accessToken: string , refreshToken: string): void{
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    // this.getUserInfo().subscribe((data: DefaultResponseType | UserInfoType)=>{
    //   if ((data as DefaultResponseType).error !== undefined){
    //     throw new Error((data as DefaultResponseType).message);
    //   }
    //   if ((data as UserInfoType).name){
    //     this.userName = (data as UserInfoType).name;
    //     console.log(this.userName);
    //   }
    // });
    this.isLogged = true;
    //оповещаем слушателей subject , что поменялось значение
    this.isLogged$.next(true);
  }

  public removeTokens(): void{
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isLogged = false;
    this.userName = 'defaultUser';
    //оповещаем слушателей subject , что поменялось значение
    this.isLogged$.next(false);
  }

  public getTokens (): {accessToken: string | null, refreshToken: string | null}{
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey),
    };
  }

  get userId(): null | string {
    return localStorage.getItem(this.userIdKey);
  }

  set userId (id: string | null) {
    if (id){
      localStorage.setItem(this.userIdKey, id);
    } else {
      localStorage.removeItem(this.userIdKey);
    }
  }

  getUserInfo(): Observable<DefaultResponseType | UserInfoType> {
    const tokens = this.getTokens();
    if (tokens && tokens.accessToken){
      return this.http.get<DefaultResponseType | UserInfoType>(environment.api+'users', { headers: {'x-auth': tokens.accessToken},
      });
    };

    throw throwError(()=>'Can not get user info');
  }


}
