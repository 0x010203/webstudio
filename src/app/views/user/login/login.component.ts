import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultResponseType } from '../../../../assets/types/default-response.type';
import { LoginResponseType } from '../../../../assets/types/login-response.type';
import { AuthService } from '../../../core/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfoType } from '../../../../assets/types/user-info.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    if (
      this.loginForm.valid &&
      this.loginForm.value.email &&
      this.loginForm.value.password
    ) {
      this.authService
        .login(
          this.loginForm.value.email,
          this.loginForm.value.password,
          !!this.loginForm.value.rememberMe
        )
        .subscribe({
          next: (data: LoginResponseType | DefaultResponseType) => {
            let error = null;
            //здесь обрабатываем если ответ 200, но в ответе всё равно ошибка
            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message;
            }

            const loginResponse: LoginResponseType = data as LoginResponseType;

            if (
              !loginResponse.accessToken ||
              !loginResponse.refreshToken ||
              !loginResponse.userId
            ) {
              error = 'Ошибка авторизации';
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            this.authService.setTokens(
              loginResponse.accessToken,
              loginResponse.refreshToken
            );
            this.authService.userId = loginResponse.userId;
            // this.authService
            //   .getUserInfo()
            //   .subscribe((data: DefaultResponseType | UserInfoType) => {
            //     if ((data as DefaultResponseType).error !== undefined) {
            //       throw new Error((data as DefaultResponseType).message);
            //     }
            //     if ((data as UserInfoType).name) {
            //       this.authService.userName = (data as UserInfoType).name;
            //       //console.log(this.userName);
            //     }
            //   });
            this._snackBar.open('Вы успешно авторизовались');
            this.router.navigate(['/']);
          },
          error: (errorResponse: HttpErrorResponse) => {
            //обработка ошибок с кодом 400 или 500
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка авторизации');
            }
          },
        });
    }
  }
}
