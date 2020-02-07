import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRedirect, HomeRedirect } from '../state/actions/auth.actions';
import { AuthState } from '../state/reducers/auth.reducers';
import { selectAuthEvents } from '../state/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class CheckAuthGuard implements CanActivate {
  constructor(private store$: Store<AuthState>) {}
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return this.store$.pipe(
      select(selectAuthEvents),
      map((auth) => {
        console.log(auth);
        if (auth) {
          this.store$.dispatch( new HomeRedirect());
          return false;
        }
        return true;
      }),
    );
  }
  }
