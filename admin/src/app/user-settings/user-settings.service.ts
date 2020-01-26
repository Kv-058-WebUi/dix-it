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
    return req
    .subscribe((res) => {
    });
  }

  dropPassword(id: number) {
    return this.http.get(`${this.url}/${id}/dropPass`)
    .subscribe(res => {
      console.log('password was dropped');
    })
  }
  banUser(id:number, banReason) {
    return this.http.put(`${this.url}/${id}/ban`, {banReason: banReason})
    .subscribe((res) => {
      console.log('done Ban');
    })
  }
  unbanUser(id:number) {
    return this.http.put(`${this.url}/${id}/unban`, null)
    .subscribe((res) => {
      console.log('undone Ban');
    })
  }
}
