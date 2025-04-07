import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserActionFormComponent } from './components/user-action-form/user-action-form.component';
import { BannerComponent } from './components/banner/banner.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { RouterModule } from '@angular/router';
import { ReviewCardComponent } from './components/review-card/review-card.component';


@NgModule({
  declarations: [UserActionFormComponent, BannerComponent, ServiceCardComponent, ArticleCardComponent, ReviewCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports:[
    UserActionFormComponent, BannerComponent, ServiceCardComponent, ArticleCardComponent, ReviewCardComponent
  ]
})
export class SharedModule { }
