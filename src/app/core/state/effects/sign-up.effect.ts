import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, SignUp, SignUpFailure, SignUpSuccess } from '../actions/auth.actions';
import { AppState } from '../reducers';

@Injectable()
export class SignUpEffect {
 public user: firebase.User;
  @Effect()
  public signUp$: Observable<SignUpSuccess> = this.actions$
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
      catchError((error, caught) => {
        this.store$.dispatch(new SignUpFailure(error));
        return caught;
      }),
    );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private store$: Store<AppState>,
  ) {
    this.afAuth.auth.onAuthStateChanged((resp) => {
      this.user = resp;
    });
  }
}
