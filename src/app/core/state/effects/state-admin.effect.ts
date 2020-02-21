import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AdminStateActions, LoadAdminFailed, LoadAdminSuccess } from '../actions/admin.actions';

@Injectable()
export class StateAdminEffect {
    @Effect()
    public adminStateValue$: any = this.actions$.pipe(
        ofType(AdminStateActions.LoadAdmin),
        mergeMap(() => from(new Promise((resolve) => {
            this.afAuth.auth.onAuthStateChanged((user: firebase.User) => {
                user.getIdTokenResult(true).then((res) => resolve(res.claims.admin));
            });
            catchError((error) => of(new LoadAdminFailed(error)));
        })).pipe(map((data) => new LoadAdminSuccess(data))),
        ));
    constructor(private actions$: Actions, private afAuth: AngularFireAuth) { }
}
