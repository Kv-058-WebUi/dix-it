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
}
