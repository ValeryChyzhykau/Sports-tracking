import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActionTypes } from '../actions/auth.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthRedirectEffect {
  @Effect({ dispatch: false })
  public loginSuccess: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccessAction),
    tap(() => {
      this.router.navigate(['/home']);
    })
  );

  @Effect({ dispatch: false })
  public signUpRedierct: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpSuccessAction),
    tap(() => {
      this.router.navigate(['/home']);
    })
  );

  constructor(private actions$: Actions, private router: Router) {}
}
