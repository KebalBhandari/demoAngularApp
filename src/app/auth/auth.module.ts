import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.services';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [],
  imports: [CommonModule,  AuthRoutingModule, FormsModule],
  providers: [AuthService],
})

export class AuthModule {}
