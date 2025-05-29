import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { HomePageComponent } from './mood/pages/home-page/home-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '', component: HomePageComponent, canLoad:[ AuthGuard ], canActivate: [AuthGuard] },
    { path: 'auth/reset-password', component: ResetPasswordComponent, pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
