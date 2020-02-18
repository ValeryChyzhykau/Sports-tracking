import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess } from '../actions/auth.actions';

@Injectable()
export class LoginEffects {
  @Effect()
  public login$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    mergeMap((data: LogIn) => {
      return this.authService
        .login(data.payload.email, data.payload.password)
        .pipe(
          map((authState) => {
            return new LogInSuccess({
              token: this.authService.getToken(),
              email: localStorage.setItem('userEmail', authState.user.email),
              id: localStorage.setItem('userId', authState.user.uid),
            });
          }),
          catchError((error) => of(new LogInFailure(error))),
        );
    }),
  );

  constructor(private actions$: Actions, private authService: AuthService ) {}
}
