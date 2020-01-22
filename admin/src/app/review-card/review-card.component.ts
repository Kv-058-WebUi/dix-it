import { Component, OnInit, Input } from '@angular/core';
import { REVIEWCARDS } from '../mock-review-cards'

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
  constructor() { }

  @Input('card') reviewCard: {
    id: number,
    path: string,
  }

  ngOnInit() {
  }

}
