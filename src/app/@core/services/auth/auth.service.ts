import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '@models';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'auth-token';
  private token: string | null = null;
  private userSubject: BehaviorSubject<UserInfo | null>;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem(this.AUTH_TOKEN_KEY);
      const user = this.token ? jwtDecode<{ user: UserInfo }>(this.token)?.user : null;
      this.userSubject = new BehaviorSubject<UserInfo | null>(user);
    } else {
      this.token = null;
      this.userSubject = new BehaviorSubject<UserInfo | null>(null);
    }
  }

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    this.userSubject.next(jwtDecode<{ user: UserInfo }>(this.token)?.user as UserInfo);
  }

  getUser() {
    return this.userSubject.getValue();
  }

  getUserUpdates() {
    return this.userSubject.asObservable();
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    this.token = null;
    this.userSubject.next(null);
    this.clearLocalStorage();
    this.router.navigateByUrl('/');
  }

  clearLocalStorage() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
  }
}
