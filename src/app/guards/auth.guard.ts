import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log('PASO POR EL GUARD')
      return this.authService.validarToken()
      .pipe(tap(isLogged => {
        if(!isLogged) {
          this.router.navigateByUrl('/login')
        }
      })) ;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.validarToken()
      .pipe(tap(isLogged => {
        if(!isLogged) {
          this.router.navigateByUrl('/login')
        }
      })) ;
  }
  
}
