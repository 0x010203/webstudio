import { Component, HostListener, OnInit } from '@angular/core';
import { ArticleService } from '../../../shared/services/article.service';
import { ActiveParamsType } from '../../../../assets/types/active-params.type';
import { ArticlesResponseType } from '../../../../assets/types/articles-response.type';
import { DefaultResponseType } from '../../../../assets/types/default-response.type';
import { ArticleType } from '../../../../assets/types/article.type';
import { ArticleCategoryType } from '../../../../assets/types/article-category.type';
import { AppliedFilterType } from '../../../../assets/types/applied-filter.type';
import { CategoryService } from '../../../shared/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs';
import { ActiveParamsUtil } from '../../../shared/utils/active-params.util';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  //private params: ActiveParamsType = {};
  protected articles: ArticleType[] = [];
  protected pages: number[] = [];
  //activePage: number = 1;
  protected articleCategories: ArticleCategoryType[] = [];
  protected activeParams: ActiveParamsType = { categories: [] };
  //appliedFilters: AppliedFilterType[] = [];
  protected filtersOpen = false;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {

      this.activeParams = ActiveParamsUtil.processParams(params);

      this.articleService
        .getArticles(this.activeParams)
        .subscribe((data: ArticlesResponseType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          const articlesFromResponse: ArticlesResponseType = (data as ArticlesResponseType);
          this.articles = articlesFromResponse.items;
          this.pages = Array.from(
            { length: articlesFromResponse.pages },
            (_, i) => i + 1
          );
          if (this.activeParams && this.activeParams.page && this.activeParams.page>articlesFromResponse.pages){
            //console.log('this.activeParams.page: ',this.activeParams.page, 'articlesFromResponse.pages:', articlesFromResponse.pages);
            //переходим на последнюю страницу, если после сброса фильтров не хватает данных
            this.activeParams.page = articlesFromResponse.pages;
          }

          this.processArticles();
        });

      this.categoryService
        .getCategories()
        .subscribe((data: ArticleCategoryType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          this.articleCategories = data as ArticleCategoryType[];
          this.setCategoriesUsed();
        });
    });
  }

  protected turnOffCategoryFromFilter(category: ArticleCategoryType): void {
    this.changeFilterOption(category);
  }

  private getArticles() {
    this.categoryService.getCategories().subscribe((data) => {
      this.articleCategories = data as ArticleCategoryType[];

      this.articleService.getArticles(this.activeParams).subscribe((data) => {
        if ((data as DefaultResponseType).error === undefined) {
          const articles = data as ArticlesResponseType;
          this.articles = articles.items;
          this.pages = [];
          for (let i = 0; i < articles?.pages; i++) {
            this.pages.push(i + 1);
          }
        }
      });

      this.processArticles();
    });
  }

  private setCategoriesUsed(): void {
    //проход по категориям в параметрах и пометка используемых категорий в массиве категорий
    this.articleCategories.forEach((category) => {
      if (
        this.activeParams.categories &&
        this.activeParams.categories.length > 0
      ) {
        if (this.activeParams.categories.includes(category.url)) {
          category.used = true;
        } else {
          category.used = false;
        }
      } else {
        category.used = false;
      }
    });
  }

  protected openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams,
      });
    }
  }

  protected openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    });
  }

  protected openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], { queryParams: this.activeParams });
    }
    if (this.activeParams.page === undefined && this.pages.length > 1) {
      //в адресной строке не указана страница и у нас больше чем одна доступная страница
      this.activeParams.page = 2;
      this.router.navigate(['/blog'], { queryParams: this.activeParams });
    }
  }

  protected toggleFiltersOpen() {
    this.filtersOpen = !this.filtersOpen;
  }

  protected changeFilterOption(category: ArticleCategoryType): void {
    if (
      this.activeParams.categories &&
      this.activeParams.categories.length > 0
    ) {
      const existingCategoryParams = this.activeParams.categories.find(
        (item) => item === category.url
      );
      if (existingCategoryParams) {
        //есть категория в url, т.е. применен фильтр
        this.activeParams.categories = this.activeParams.categories.filter(
          (item) => item !== category.url
        );
      } else {
        this.activeParams.categories = [
          ...this.activeParams.categories,
          category.url,
        ];
      }
    } else {
      this.activeParams.categories = [category.url];
    }

    this.setCategoriesUsed();
    this.getArticles();
  }

  protected processArticles() {
    this.router.navigate([], { queryParams: this.activeParams });
  }

  @HostListener('document:click', ['$event'])
  click(event: Event) {
    if (
      this.filtersOpen &&
      event.target &&
      (event.target as HTMLElement).className &&
      (event.target as HTMLElement).className.indexOf(
        'blog-filters-options'
      ) === -1
    ) {
      this.filtersOpen = false;
    }
  }
}
