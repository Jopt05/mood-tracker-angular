import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
