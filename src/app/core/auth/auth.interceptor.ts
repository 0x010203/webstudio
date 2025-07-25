import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "./auth.service";


import { Router } from "@angular/router";
import { DefaultResponseType } from "../../../assets/types/default-response.type";
import { LoginResponseType } from "../../../assets/types/login-response.type";


@Injectable()
//Обязательно добавляем декоратор чтобы интерсептор работал
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService, private router: Router/*, private loaderService: LoaderService*/){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //this.loaderService.show();
        //console.log(`Sending request - method: ${req.method}, url: ${req.url}, params: ${req.params}, body: ${req.body}`);

        const tokens = this.authService.getTokens();
        if (tokens && tokens.accessToken){
            const authReq = req.clone({
                headers: req.headers.set('x-auth', tokens.accessToken)
            });
            return next.handle(authReq)
            .pipe(
                //309 34:37
                catchError((error)=>{
                    if (error.status === 401 && !authReq.url.includes('/login') && !authReq.url.includes('/refresh')){
                        return this.handle401Error(authReq, next);
                    }
                    return throwError(()=> error);
                }),
                //finalize(/*()=>this.loaderService.hide()*/)
            );
        }
        
        return next.handle(req);
        //.pipe(finalize(/*()=>this.loaderService.hide()*/));
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler){
        return this.authService.refresh()
        .pipe(
            //Переключаемся на другой observable
            switchMap((result: DefaultResponseType|LoginResponseType  )=>{
                let error = '';
                if ((result as DefaultResponseType).error !== undefined){
                    error = (result as DefaultResponseType).message;
                }

                const refreshResult = result as LoginResponseType;
                if (!refreshResult.accessToken || !refreshResult.refreshToken || !refreshResult.userId){
                    error = 'Ошибка авторизации';
                }

                if (error){
                    return throwError(()=> new Error(error));
                }

                this.authService.setTokens(refreshResult.accessToken,refreshResult.refreshToken );
                const authReq = req.clone({
                    headers: req.headers.set('x-access-token', refreshResult.accessToken)
                });
                return next.handle(authReq);
            }),
            catchError(error=>{
                this.authService.removeTokens();
                this.router.navigate(['/']);
                return throwError(()=> error);
            })
        );
    }
}