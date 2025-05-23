import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      return this.authService.getCurrentUser().pipe(
        map(response => {
          if( response.payload ) return true
            this.router.navigate(['/login'])
            return false;
        }),
        catchError((error) => this.router.navigate(['/login']))
      );
  }

  canLoad(
      route: Route,
      segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.getCurrentUser().pipe(
        map(response => {
          if( response.payload ) return true
            this.router.navigate(['/login'])
            return false;
        }),
        catchError((error) => this.router.navigate(['/login']))
      );
  }
}
