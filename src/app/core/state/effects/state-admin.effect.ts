import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AdminStateActions, LoadAdminFailed, LoadAdminSuccess } from '../actions/admin.actions';
import { AppState } from '../reducers';

@Injectable()
export class StateAdminEffect {
  @Effect()
  public adminStateValue$: Observable<LoadAdminSuccess> = this.actions$.pipe(
    ofType(AdminStateActions.LoadAdmin),
    mergeMap(() =>
      from(
        new Promise(resolve => {
          this.afAuth.auth.onAuthStateChanged((user: firebase.User) => {
            user
              .getIdTokenResult(true)
              .then((res: firebase.auth.IdTokenResult) =>
                resolve(res.claims.admin),
              );
          });
        }),
      ).pipe(map((data: boolean) => new LoadAdminSuccess(data))),
    ),
    catchError((error, caught) => {
      this.store$.dispatch(new LoadAdminFailed(error));
      return caught;
    }),
  );
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private store$: Store<AppState>,
  ) {}
}
