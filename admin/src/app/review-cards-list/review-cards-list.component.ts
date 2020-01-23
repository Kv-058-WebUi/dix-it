import { Component, OnInit } from '@angular/core';
import { ReviewCardsService } from './review-cards-list.service';

export class ReviewCards {
  card_id: number;
  card_path: string;
}
@Component({
  selector: 'app-review-cards-list',
  templateUrl: './review-cards-list.component.html',
  styleUrls: ['./review-cards-list.component.scss']
})
export class ReviewCardsListComponent implements OnInit {
  reviewCards: ReviewCards[];
  constructor(private reviewCardsService: ReviewCardsService) { }

  ngOnInit() {
    this.getReviewCards();
  }

  getReviewCards(): void {
    this.reviewCardsService.getReviewCards()
        .subscribe(reviewCards => this.reviewCards = reviewCards);
  }

  deleteReviewCard(card): void {
    this.reviewCardsService.deleteReviewCard(card).subscribe(res => {
            let index = this.reviewCards.findIndex(c => c === card);
            this.reviewCards.splice(index, 1);
    });
  }

}
