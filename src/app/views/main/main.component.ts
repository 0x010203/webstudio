import { Component, OnInit } from '@angular/core';
import { BannerInfoType } from '../../../assets/types/bunner-info.type';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ServiceType } from '../../../assets/types/service.type';
import { ArticleService } from '../../shared/services/article.service';
import { ArticleType } from '../../../assets/types/article.type';
import { DefaultResponseType } from '../../../assets/types/default-response.type';
import { ReviewType } from '../../../assets/types/review.type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  banners: BannerInfoType[] = [
    {   descriptionSpan1 : '',
      descriptionText1: 'Продвижение в Instagram для вашего бизнеса ',
      descriptionSpan2: '-15%',
      descriptionText2: '!',
      title: 'Предложение месяца',
      descriptionAddedInfo: '',
      id: 1
    },
  {  descriptionSpan1 : '',
      descriptionText1: 'Нужен грамотный ',
      descriptionSpan2: 'копирайтер',
      descriptionText2: '?',
      descriptionAddedInfo: 'Весь декабрь у нас действует акция на работу копирайтера.',
      title: 'Акция',
      id: 2
    },
  {  descriptionSpan1 : '6 место',
      descriptionText1: 'в ТОП-10 SMM-агенств Москвы!',
      descriptionSpan2: '',
      descriptionText2: '',
      descriptionAddedInfo: 'Мы благодарим каждого, кто голосовал за нас!',
      title: 'Новость дня',
      id: 3
    }
  ];
  services: ServiceType[] = [
    {
      id: 1,
      title: 'Создание сайтов',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 7500,
    },
    {
      id: 2,
      title: 'Продвижение',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 3500,
    },
    {
      id: 3,
      title: 'Реклама',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 1000,
    },
    {
      id: 4,
      title: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 750,
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    margin: 0,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 0,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 3,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
  };
  
  articlesTop : ArticleType[] = [];

  reviews: ReviewType[] =[
    
      {
        image : 'person1.png',
        title: 'Станислав',
        info: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.',
      },
      {
        image : 'person2.png',
        title: 'Алёна',
        info: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.',
      },
      {
        image : 'person3.png',
        title: 'Мария',
        info: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!',
      },
      {
        image : 'person1.png',
        title: 'Иван',
        info: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!',
      },
    
  ]


  constructor(private articleService: ArticleService) {
    
   }

  ngOnInit(): void {
    // this.banners = 
    // [
    //   {   descriptionSpan1 : '',
    //       descriptionText1: 'Продвижение в Instagram для вашего бизнеса ',
    //       descriptionSpan2: '-15%',
    //       descriptionText2: '!',
    //       title: 'Предложение месяца',
    //       descriptionAddedInfo: '',
    //       id: 1
    //     },
    //   {  descriptionSpan1 : '',
    //       descriptionText1: 'Нужен грамотный ',
    //       descriptionSpan2: 'копирайтер',
    //       descriptionText2: '?',
    //       descriptionAddedInfo: 'Весь декабрь у нас действует акция на работу копирайтера.',
    //       title: 'Акция',
    //       id: 2
    //     },
    //   {  descriptionSpan1 : '6 место',
    //       descriptionText1: 'в ТОП-10 SMM-агенств Москвы!',
    //       descriptionSpan2: '',
    //       descriptionText2: '',
    //       descriptionAddedInfo: 'Мы благодарим каждого, кто голосовал за нас!',
    //       title: 'Новость дня',
    //       id: 3
    //     }
    // ];

    // this.services = [
    //   {
    //     id: 1,
    //     title: 'Создание сайтов',
    //     description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
    //     price: 7500,
    //   },
    //   {
    //     id: 2,
    //     title: 'Продвижение',
    //     description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
    //     price: 7500,
    //   },
    //   {
    //     id: 3,
    //     title: 'Реклама',
    //     description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
    //     price: 1000,
    //   },
    //   {
    //     id: 4,
    //     title: 'Копирайтинг',
    //     description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
    //     price: 750,
    //   },
    // ]
    this.articleService.getTopArticles()
    .subscribe((data: ArticleType[] | DefaultResponseType) => {
      //console.log(data);
      if ((data as DefaultResponseType).error !== undefined) {
        throw new Error((data as DefaultResponseType).message);
      }
      this.articlesTop = data as ArticleType[];

    })
  }

}
