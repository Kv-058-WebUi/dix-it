import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class UploadCardServiceService {

  constructor(
      private http: HttpClient
  ) { }

  private url = 'api/img-upload';

  uploadImage(requestBody) {
    const req = this.http.post(this.url, {
      name: UUID.UUID(),
      url: requestBody
    });
    return req
        .subscribe((req) => {
        });
  }
}
