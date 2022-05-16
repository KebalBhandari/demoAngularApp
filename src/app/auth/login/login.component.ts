import { Component, OnInit } from "@angular/core";
import jwt_decode from 'jwt-decode';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

  export class LoginComponent implements OnInit { 
    constructor(public authService: AuthService, public router: Router) {}
    ngOnInit(): void {}

    hide = true;

  successMessage: string = '';
  errorMessage: string = '';

  authLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    this.errorMessage = '';

    const loginData = {
      UserEmail: loginForm.value.userEmail,
      UserPassword: loginForm.value.userPassword,
    };

    this.authService
      .authLogin(loginData.UserEmail, loginData.UserPassword)
      .subscribe({
        next: (result: any) => {
          AuthInterceptor.accessToken = result.token;
          window.localStorage.removeItem('token');
          window.localStorage.setItem('token', 'Bearer ' + result.token);

          const { role } = this.getDecodedAccessToken(result.token);
          this.successMessage = result.msg;

          if (role[0] === 'admin') {
            setTimeout(() => {
              this.router.navigateByUrl('/admin/dashboard').then();
            }, 1000);
          } else {
            setTimeout(() => {
              // location.reload();
              this.router.navigateByUrl('').then();
            }, 1000);
          }
        },

        error: (err) => {
          this.errorMessage = err.error.msg;
        },
      });
  }

    getDecodedAccessToken(token: string): any {
      try {
        return jwt_decode(token);
      } catch (Error) {
        return null;
      }
    }
   }