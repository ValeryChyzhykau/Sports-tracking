import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, LogoutFailed, LogoutSuccess } from '../actions/auth.actions';

@Injectable()
export class LogoutEffect {
  @Effect({ dispatch: false })
  public logout$: any = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    map(() => {
      this.authService.logout().pipe(
        map(() => {
          return of(
            new LogoutSuccess({
              user: null,
              id: null,
            }),
          );
        }),
      );
    }),
    catchError(error => of(new LogoutFailed(error)))
  );
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}
}
