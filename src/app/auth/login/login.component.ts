import { Component, OnChanges, OnInit } from "@angular/core";
import jwt_decode from 'jwt-decode';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import Swal from 'sweetalert2';

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

  authSignUp(signUpForm: NgForm){

    this.errorMessage = '';
    this.successMessage='';

    if (signUpForm.invalid) {
      return;
    }

    const signUpData = {
      UserName: signUpForm.value.userName,
      UserEmail: signUpForm.value.userEmail,
      UserPassword: signUpForm.value.userPassword,
      UserAddress: signUpForm.value.userAddress,
      UserContactNo: signUpForm.value.userContactNumber,
    };

    this.authService
    .authSignup(signUpData.UserName, signUpData.UserPassword, signUpData.UserEmail, signUpData.UserContactNo, signUpData.UserAddress)
    .subscribe({
      next: (result: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: result.msg
        })

      AuthInterceptor.accessToken = result.token;
      window.localStorage.removeItem('token');
      window.localStorage.setItem('token', 'Bearer ' + result.token);

      setTimeout(() => {
        this.router.navigateByUrl('/').then();
      }, 1000);
    },
    error: (err) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: err.error.msg,
      })
    }
    })
  }

  authLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.successMessage='';

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

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: result.msg
          })

          if (role[0] === 'admin') {
            setTimeout(() => {
              this.router.navigateByUrl('/admin/dashboard').then();
            }, 1000);
          } else {
            setTimeout(() => {
              this.router.navigateByUrl('').then();
            }, 1000);
          }
        },

        error: (err) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'error',
            title: err.error.msg,
          })
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
