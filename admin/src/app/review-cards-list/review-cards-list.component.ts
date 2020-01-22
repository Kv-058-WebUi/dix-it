import { Component, OnInit } from '@angular/core';
import { REVIEWCARDS } from '../mock-review-cards';

@Component({
  selector: 'app-review-cards-list',
  templateUrl: './review-cards-list.component.html',
  styleUrls: ['./review-cards-list.component.scss']
})
export class ReviewCardsListComponent implements OnInit {
  reviewCards = REVIEWCARDS;
  constructor() { }

  ngOnInit() {
  }

}
