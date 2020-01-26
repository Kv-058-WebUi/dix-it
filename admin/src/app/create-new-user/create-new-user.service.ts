import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateNewUserService {

  constructor(
    private http: HttpClient
  ) { }

  private url = 'api/auth/register'

  public createUser(reqBody) {
    return this.http.post(this.url, reqBody)
    .subscribe(res => {

    })
  }
}
