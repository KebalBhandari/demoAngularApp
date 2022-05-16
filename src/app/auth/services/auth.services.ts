import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  
  export class AuthService {
    public URL = 'http://localhost:5000';
    constructor(public http: HttpClient, public router: Router) {}
  
    authSignup(signupData: any) {
      return this.http.post(`${this.URL}/auth/signup`, signupData);
    }
  
    authLogin(UserEmail: string, UserPassword: string) {
      return this.http.post(`${this.URL}/auth/login`, { UserEmail, UserPassword });
    }
  
    logout() {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/').then();
  
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }
  