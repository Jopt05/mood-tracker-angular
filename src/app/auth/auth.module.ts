import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RequestResetComponent } from './pages/request-reset/request-reset.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';



@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    RequestResetComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ]
})
export class AuthModule { }
