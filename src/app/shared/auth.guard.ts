/**
 * Title: auth.guard.ts
 * Author: Emily Richter
 * Date: 23 September 2020
 * Description: Sprint 1 -- authorization guard
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {

  }
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot )//: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const sessionUser = this.cookieService.get('session_user');

    if (sessionUser) {
      return true;
    } else {
      this.router.navigate(['/session/signin']);
      return false;
    }
  }
}
