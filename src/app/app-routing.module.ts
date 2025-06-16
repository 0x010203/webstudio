import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { MainComponent } from './views/main/main.component';
import { AuthForwardGuard } from './core/auth/auth-forward.guard';
import { ArticleComponent } from './views/blog/article/article.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, 
    children: [
      { path: '', component: MainComponent},
      {path: 'article/:url', component: ArticleComponent},
      {
        path: '',
        loadChildren: () =>
          import('./views/blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/user/user.module').then((m) => m.UserModule),
        //можно указать guard для всего модуля, можно отдельно для каждой страницы
        //canActivate: [AuthForwardGuard]
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/privacy/privacy.module').then((m) => m.PrivacyModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' }), ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
