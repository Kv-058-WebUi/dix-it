import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Card } from './gallery/gallery.component';



@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private cardsUrl = 'api/cards';

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl)
  }

  deleteCard (card: Card | number): any {
    const id = typeof card === 'number' ? card : card.card_id;
    const url = `${this.cardsUrl}/${id}`;  
    return this.http.delete<Card>(url);   
  }
}
