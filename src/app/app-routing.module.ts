import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomePageComponent } from './mood/pages/home-page/home-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '', component: HomePageComponent, canLoad:[ AuthGuard ], canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
