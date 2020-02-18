import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes } from '../actions/auth.actions';

@Injectable()
export class LogoutEffect {
  @Effect({ dispatch: false })
  public logout$: any = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
      localStorage.clear();
    }),
  );
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
  ) {}
}
