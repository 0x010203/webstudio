import { Component, Input, OnInit } from '@angular/core';
import { BannerInfoType } from '../../../../assets/types/bunner-info.type';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() bannerInfo! : BannerInfoType;

  constructor() {
    //this.bannerInfo = bannerInfo;
    // this.bannerInfo = {
    //   descriptionSpan1 : '',
    //   descriptionText1: 'Продвижение в Instagram для вашего бизнеса ',
    //   descriptionSpan2: '-15%',
    //   descriptionText2: '!',
    //   title: 'Предложение месяца',
    //   id: 1
    // }
    

   }

  ngOnInit(): void {
  }

}
