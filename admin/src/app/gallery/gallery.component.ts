import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery.service';

export class Card {
  path_id: number;
  path_url: string;
}
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  cards: Card[];
  
  constructor(private galleryService: GalleryService) { }
    
  ngOnInit() {
    this.getCards();
  }

  getCards(): void {
    this.galleryService.getCards()
        .subscribe(cards => this.cards = cards);
  }
  
  isScroll: boolean = false;

}
