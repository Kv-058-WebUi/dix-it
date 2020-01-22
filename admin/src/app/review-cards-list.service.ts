import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReviewCards } from './review-cards-list/review-cards-list.component'


@Injectable({
  providedIn: 'root'
})
export class ReviewCardsService {
  private cardsUrl = 'api/reviewcards';

  constructor(private http: HttpClient) { }

  getReviewCards(): Observable<ReviewCards[]> {
    return this.http.get<ReviewCards[]>(this.cardsUrl)
  }
}
