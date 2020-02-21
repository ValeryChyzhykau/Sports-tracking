import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckAuthGuard implements CanActivate {
  constructor( private router: Router, private authService: AuthService) {}
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     const check = this.authService.checkStatus();
     return check.pipe(map((data: boolean) => {
       if (data) {
         this.router.navigate(['/home']);
        }
       return !data;
       }));
}
}
