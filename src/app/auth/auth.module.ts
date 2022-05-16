import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.services';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [CommonModule,  AuthRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService],
})

export class AuthModule {}
