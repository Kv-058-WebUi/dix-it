import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReviewCards  } from './review-cards-list.component';


@Injectable({
  providedIn: 'root'
})
export class ReviewCardsService {
  private reviewCardsUrl = 'api/reviewcards';
  private cardsUrl = 'api/cards';

  constructor(private http: HttpClient) { }

  getReviewCards(): Observable<ReviewCards[]> {
    return this.http.get<ReviewCards[]>(this.reviewCardsUrl)
  }

  deleteReviewCardFromDB(card) {
    return this.http.delete(`${this.reviewCardsUrl}/${card.card_id}`)
  }

  rejectCard(card: ReviewCards | number): any {
    const id = typeof card === 'number' ? card : card.card_id;
    const url = `${this.cardsUrl}/${id}`; 
    return this.http.delete<ReviewCards>(url);
  }

  addReviewCardToCards(card) {
    const req = this.http.post(`${this.cardsUrl}`, {
      card_path: card.card_path,
    });
    return req;
  }
}
