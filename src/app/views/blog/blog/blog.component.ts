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
import { debounceTime } from 'rxjs';
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

  params: ActiveParamsType = {};
  articles: ArticleType[] = [];
  pages: number[] = [];
  //activePage: number = 1;
  articleCategories: ArticleCategoryType[] = [];
  activeParams: ActiveParamsType = { categories: [] };
  appliedFilters: AppliedFilterType[] = [];
  filtersOpen = false;

  ngOnInit(): void {

    this.articleService
      .getArticles(this.params)
      .subscribe((data: ArticlesResponseType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }

        this.articles = (data as ArticlesResponseType).items;
        this.pages = Array.from(
          { length: (data as ArticlesResponseType).pages },
          (_, i) => i + 1
        );
        this.processArticles();
        //console.log(this.pages);

        // this.articles.forEach(element => {
        //   const category = this.articleCategories.find((item)=>{return item  === element.category});
        //   if (!category){
        //     this.articleCategories.push(element.category);
        //     //console.log(this.articleCategories);
        //   }

        //});
      });

    this.activatedRoute.queryParams.subscribe((params) => {
      //console.log('this.activatedRoute.queryParams.subscribe');
      this.activeParams = ActiveParamsUtil.processParams(params);

      this.categoryService
        .getCategories()
        .subscribe((data: ArticleCategoryType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          this.articleCategories = data as ArticleCategoryType[];
          //this.processCategories();
          //console.log(this.articleCategories );
        });

      if (this.activeParams.categories){
        this.processCategories();
      }
      //console.log(this.activeParams);

      
      //console.log('this.activatedRoute.queryParams');
      //console.log(this.activeParams);
    });
  }

  processCategories(): void {
    // if (this.activeParams.categories && this.activeParams.categories.length>0) {
    //   this.activeParams.categories.forEach((item: string)=>{
    //     const category =  this.articleCategories.find (category => category.url === item);
    //     if (!category){
    //       //не нашли категорию, надо добавить
    //     }
    //   })
    // }
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams,
      });
    }
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams,
    });
  }
  openNextPage() {
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

  toggleFiltersOpen() {
    this.filtersOpen = !this.filtersOpen;
  }

  changeFilterOption(category: ArticleCategoryType): void {
    console.log('changeFilterOption');
    //console.log(category);
    //console.log(this.activeParams);
    //const param : ActiveParamsType = this.activeParams.categories?.find((elem)=>{elem === })
    //this.activeParams.categories?.push(category.url);
    if (category.used){
      //надо убрать из фильтра и строки поиска
      this.activeParams.categories = this.activeParams.categories?.filter(item=>item !== category.url);
      category.used = false;
    } else{
      //добавить к фильтру и в адресную строку
      this.activeParams.categories?.push(category.url);
      category.used = true;
    }
    this.router.navigate(['/blog'], { queryParams: this.activeParams });
    //console.log('changeFilterOption this.activeParams:');
    //console.log(this.activeParams);
  }

  processArticles() {
    console.log('processArticles');
    // this.activatedRoute.queryParams
    //   .pipe(debounceTime(500))
    //   .subscribe((params) => {
    //     console.log('processArticles');
    //     console.log(params);
    //     this.activeParams = ActiveParamsUtil.processParams(params);
    //   });
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
