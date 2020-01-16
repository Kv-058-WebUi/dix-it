import { Component, OnInit } from '@angular/core';
import { CARDS } from '../cardDeck';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  cards = CARDS;
  
  
  constructor() { }

  ngOnInit() {
  }

}
