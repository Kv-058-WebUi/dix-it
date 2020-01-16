import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

export type UserType = {
  nickname: string,
  email: string,
  created_at: Date
}

@Injectable({
  providedIn: 'root'
})
export class UserControllerService {

  constructor(
    private http: HttpClient
  ) {  }
  private usersUrl = 'api/users';
  public users$ = [];

  getUsers(): Observable<UserType[]> {
    return this.http.get<UserType[]>(this.usersUrl)
  }
}


