import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserType } from '../user-controller/user-controller.service';


@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(
    private http: HttpClient
  ) { }

  private url = 'api/users'
  
  updateUser(user: UserType, requestBody: any) {
    const req = this.http.put(
      `${this.url}/${user.user_id}`,
      requestBody,
        {headers: {
          'Accept': 'application/json',
          'Allow': 'GET, POST, PUT'
        }}
      )
      console.log('reqbody',requestBody)
      console.log(req);
    return req
    .subscribe((req) => {
      console.log('get Modified', req);
    });
  }
}
