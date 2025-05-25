import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { LoadingServiceService } from "../../shared/services/loading-service.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private loadingService: LoadingServiceService,
    private router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      this.loadingService.show();
      return this.authService.getCurrentUser().pipe(
        map(response => {
          if( response.payload ) {
            this.loadingService.hide();
            return true;
          }
          this.loadingService.hide();
          this.router.navigate(['/login'])
          return false;
        }),
        catchError((error) => {
          this.router.navigate(['/login'])
          this.loadingService.hide();
          return of(false);
        })
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
