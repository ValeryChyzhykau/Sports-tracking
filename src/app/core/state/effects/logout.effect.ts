import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, LogoutFailed, LogoutSuccess } from '../actions/auth.actions';
import { AppState } from '../reducers';

@Injectable()
export class LogoutEffect {
  @Effect({ dispatch: false })
  public logout$: Observable<Observable<LogoutSuccess>> = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    map(() => {
    return this.authService.logout().pipe(
        map(() => {
          return new LogoutSuccess({
              user: null,
              id: null,
            });
        }),
      );
    }),
    catchError((error, caught) => {
      this.store$.dispatch(new LogoutFailed(error));
      return caught;
    }),
  );
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private authService: AuthService,
  ) {}
}
