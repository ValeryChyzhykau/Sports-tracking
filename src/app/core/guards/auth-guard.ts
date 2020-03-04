import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth-service/auth.service';
import { AuthState } from '../state/reducers/auth.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store$: Store<AuthState>,
    private router: Router,
    private authService: AuthService
  ) {}
  public canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const check = this.authService.checkStatus();
    return check.pipe(
      map((data: boolean) => {
        if (!data) {
          this.router.navigate(['/login']);
        }
        return data;
      })
    );
  }
}
