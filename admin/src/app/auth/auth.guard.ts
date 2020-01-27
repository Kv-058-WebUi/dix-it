import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

interface JwtPayload {
  nickname: string,
  roles: Array<string>
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = localStorage.getItem('jwt_token');

    if(token) {
      const decoded = jwt_decode(token) as JwtPayload;
      console.log(decoded.nickname, decoded.roles);
      if(!decoded.roles.includes('admin')) {
        this.router.navigate(['/forbidden']);
        return false;
      } else {
        return true;
      }
    }
  }
}