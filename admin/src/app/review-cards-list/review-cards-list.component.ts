import { Component, OnInit } from '@angular/core';
import { ReviewCardsService } from './review-cards-list.service';
import { Card } from '../gallery/gallery.component'


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
  cards: Card[];
  constructor(private reviewCardsService: ReviewCardsService) { }
  
  ngOnInit() {
    this.getReviewCards();
  }

  getReviewCards(): void {
    this.reviewCardsService.getReviewCards()
      .subscribe(reviewCards => this.reviewCards = reviewCards);
  }

  deleteReviewCardFromDB(card): void {
    this.reviewCardsService.deleteReviewCardFromDB(card).subscribe(res => {
      let index = this.reviewCards.findIndex(c => c === card);
      this.reviewCards.splice(index, 1);
    });
  }

  rejectCard(card: ReviewCards): void {
    this.reviewCards = this.reviewCards.filter(c => c !== card);
    this.reviewCardsService.rejectCard(card).subscribe();
  }

  addReviewCardToCards(card): void {
    this.deleteReviewCardFromDB(card);
    this.reviewCardsService.addReviewCardToCards(card).subscribe();
  }

}
