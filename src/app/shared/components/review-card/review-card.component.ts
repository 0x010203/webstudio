import { Component, Input, OnInit } from '@angular/core';
import { ReviewType } from '../../../../assets/types/review.type';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {

  @Input() review!: ReviewType;

  constructor() {
    // this.review = {
    //   image : 'person1.png',
    //   title: 'Станислав',
    //   info: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.',
    // }
   }

  ngOnInit(): void {
  }

}
