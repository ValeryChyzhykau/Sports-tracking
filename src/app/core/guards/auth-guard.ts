import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  LoginRedirect } from '../state/actions/auth.actions';
import { AuthState } from '../state/reducers/auth.reducers';
import { selectAuthEvents } from '../state/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store$: Store<AuthState>, private router: Router) {}
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store$.pipe(
      select(selectAuthEvents),
      map((auth) => {
        console.log(auth);
        if (!auth) {
         this.store$.dispatch( new LoginRedirect());
        }
        return true;
      }),
    );
  }
}
