import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, SignUp, SignUpFailure, SignUpSuccess } from '../actions/auth.actions';

@Injectable()
export class SignUpEffect {
 public user: firebase.User;
  @Effect()
  public signUp$: any = this.actions$
    .pipe(
      ofType(AuthActionTypes.SignUp),
      map((action: SignUp) => action.payload),
      switchMap((auth: any) => {
        return this.authService.signUp(
          auth.email,
          auth.password,
          auth.userName,
          auth.login,
          auth.phone,
        );
      }),
    )
    .pipe(
      map(() => {
         this.authService.getToken(),
         localStorage.setItem("userId", this.user.uid),
         localStorage.setItem("userEmail", this.user.email);
         return new SignUpSuccess({
          email: localStorage.getItem("userEmail"),
          token: localStorage.getItem("userToken"),
          id: localStorage.getItem("userId"),
        });

      }),
      catchError((error) => of(new SignUpFailure(error))),
    );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.auth.onAuthStateChanged((resp) => {
      this.user = resp;
    });
  }
}
