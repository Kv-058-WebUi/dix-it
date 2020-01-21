import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UploadCardServiceService {

  constructor(
      private http: HttpClient
  ) { }

  private url = 'api/img-upload';

  uploadImage(requestBody) {
    const req = this.http.post(this.url, {url: requestBody});
    return req
        .subscribe((req) => {
        });
  }
}
