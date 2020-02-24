import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess } from '../actions/auth.actions';
import { AppState } from '../reducers';

@Injectable()
export class LoginEffects {
  @Effect()
  public login$: Observable<LogInSuccess> = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    mergeMap((data: LogIn) => {
      return this.authService
        .login(data.payload.email, data.payload.password)
        .pipe(
          map((authState: User) => {
            this.authService.getToken();
            localStorage.setItem('userEmail', authState.user.email);
            localStorage.setItem('userId', authState.user.uid);
            return new LogInSuccess({
              user: localStorage.getItem('userToken') || '',
              email:  authState.user.email,
              id: authState.user.uid,
            });
          }),
          catchError((error, caught) => {
            this.store$.dispatch(new LogInFailure(error));
            return caught;
          } ),
        );
    }),
  );

  constructor(private actions$: Actions, private authService: AuthService, private store$: Store<AppState>) {}
}
