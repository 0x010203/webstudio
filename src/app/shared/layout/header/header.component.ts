import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultResponseType } from '../../../../assets/types/default-response.type';
import { UserInfoType } from '../../../../assets/types/user-info.type';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  protected isLogged: boolean;
  protected userName: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.isLogged = this.authService.getIsLoggedIn();
    if (this.isLogged && !this.userName) {
      this.getUserInfo();
    }
  }

  linkActiveParams: IsActiveMatchOptions = {
    matrixParams: 'exact',
    queryParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };

  ngOnInit(): void {
    //console.log('header.init');
    // this.authService.isLogged$
    // .pipe(tap(value => console.log(`header:isLogged$.subscribe.tap ${value}`)))
    // .subscribe((isLoggedIn: boolean) => {

    //   this.isLogged = isLoggedIn;
    //   if (isLoggedIn){
    //           this.authService
    //           .getUserInfo()
    //           .subscribe((data: DefaultResponseType | UserInfoType) => {
    //             if ((data as DefaultResponseType).error !== undefined) {
    //               throw new Error((data as DefaultResponseType).message);
    //             }
    //             if ((data as UserInfoType).name) {
    //               const gettingUserName: string = (data as UserInfoType).name;
    //               this.authService.userName = gettingUserName;
    //               this.userName = gettingUserName;
    //               console.log(`username: ${this.userName}`);
    //             }
    //           });
    //   }
    // });

    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      if (this.isLogged) {
        this.getUserInfo();
      } else {
        this.userName = '';
      }
    });
  }

  private getUserInfo(): void {
    this.authService
      .getUserInfo()
      .subscribe((data: DefaultResponseType | UserInfoType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        if ((data as UserInfoType).name) {
          const gettingUserName: string = (data as UserInfoType).name;
          this.authService.userName = gettingUserName;
          this.userName = gettingUserName;
        }
      });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.doLogout();
      },
      error: (/*errorResponse: HttpErrorResponse*/) => {
        this.doLogout();
      },
    });
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this.userName = 'defaultUser';
    this._snackBar.open('Вы успешно вышли из системы');
    this.router.navigate(['/']);
  }

  scrollTo(fragment: string): void {
    this.router.navigate(['/'], { fragment }).then(() => {
      setTimeout(() => {
        const elem = document.getElementById(fragment);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    });
  }
}
