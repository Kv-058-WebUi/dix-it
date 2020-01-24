import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isAdmin() {

  }
  
  ngOnInit() {
    let admin:boolean;
    const token = localStorage.getItem('jwt_token');
    interface JwtPayload {
      nickname: string,
      roles: Array<string>
    }
    if(token) {
      const decoded = jwt_decode(token) as JwtPayload;
      // console.log(decoded.nickname, decoded.roles);
      if(decoded.roles.includes('admin')) {
        admin = true;
      } else {
        admin = false;
      }
    }
    console.log(admin);
    return admin;
  }
}
