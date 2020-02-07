import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, SignUp, SignUpFailure, SignUpSuccess } from '../actions/auth.actions';

@Injectable()
export class SignUpEffect {
  @Effect()
  public signUp$: any = this.actions$
    .pipe(
      ofType(AuthActionTypes.SignUp),
      map((action: SignUp) => action.payload),
      switchMap((auth: any) => {
        return this.authService.signUp(
          auth.email,
          auth.password,
          auth.login,
          auth.phone,
          auth.userName,
        );
      }),
    )
    .pipe(
      switchMap(() => {
        this.afAuth.auth.onAuthStateChanged((resp) => {
          resp.sendEmailVerification();
        });
        return of(new SignUpSuccess());
      }),
      catchError((error) => of(new SignUpFailure(error))),
    );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
  ) {}
}
