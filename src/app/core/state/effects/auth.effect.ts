import { Injectable } from '@angular/core';
import { AuthService } from '@src/app/core/services/auth-service/auth.service';
import { User } from '@modules/auth/interfaces/user.interface';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {
  AuthActionTypes,
  LogInAction,
  LogInFailureAction,
  LogInSuccessAction,
  LogoutSuccessAction,
  LogoutFailedAction,
  SignUpSuccessAction,
  SignUpAction,
  SignUpFailureAction
} from '../actions/auth.actions';
import { AppState } from '../reducers';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthEffects {
  public user: firebase.User;

  @Effect()
  public login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LoginAction),
    mergeMap((data: LogInAction) => {
      return this.authService
        .login(data.payload.email, data.payload.password)
        .pipe(
          map((authState: User) => {
            this.authService.getToken();
            localStorage.setItem('userEmail', authState.user.email);
            localStorage.setItem('userId', authState.user.uid);
            return new LogInSuccessAction({
              user: localStorage.getItem('userToken') || '',
              email: authState.user.email,
              id: authState.user.uid
            });
          }),
          catchError((error: Error, caught: Observable<Action>) => {
            this.store$.dispatch(new LogInFailureAction(error));
            return caught;
          })
        );
    })
  );

  @Effect()
  public logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutAction),
    switchMap(() => {
      return this.authService.logout().pipe(
        map(() => {
          return new LogoutSuccessAction({
            user: null,
            id: null
          });
        })
      );
    }),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new LogoutFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public signUp$: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActionTypes.SignUpAction),
      map((action: SignUpAction) => action.auth),
      switchMap(
        (auth: {
          email: string;
          password: string;
          userName: string;
          login: string;
          phone: number;
        }) => {
          return this.authService.signUp(
            auth.email,
            auth.password,
            auth.userName,
            auth.login,
            auth.phone
          );
        }
      )
    )
    .pipe(
      map(() => {
        this.authService.getToken(),
          localStorage.setItem('userId', this.user.uid),
          localStorage.setItem('userEmail', this.user.email);
        return new SignUpSuccessAction({
          email: localStorage.getItem('userEmail'),
          user: localStorage.getItem('userToken'),
          id: localStorage.getItem('userId')
        });
      }),
      catchError((error: Error, caught: Observable<Action>) => {
        this.store$.dispatch(new SignUpFailureAction(error));
        return caught;
      })
    );
  constructor(
    private afAuth: AngularFireAuth,
    private actions$: Actions,
    private authService: AuthService,
    private store$: Store<AppState>
  ) {
    this.afAuth.auth.onAuthStateChanged((resp: firebase.User) => {
      this.user = resp;
    });
  }
}
