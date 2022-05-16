import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })

  export class AuthService {
    public URL = 'http://localhost:5000';
    constructor(public http: HttpClient, public router: Router) {}

    authSignup(UserName: string,  UserPassword:string, UserEmail:string, UserContactNo: string, UserAddress: string) {
      return this.http.post(`${this.URL}/auth/signup`, {UserName,UserPassword,UserEmail,UserContactNo,UserAddress});
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
