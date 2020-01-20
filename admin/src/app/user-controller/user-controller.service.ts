import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

export type UserType = {
  nickname: string,
  email: string,
  created_at: Date,
  user_id: number
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
  banUser(id:number) {
    return this.http.delete(`${this.usersUrl}/${id}`)
    .subscribe((res) => {
      console.log('done Ban');
    })
  }
}


