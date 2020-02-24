import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { RemoveGymSuccess } from '../actions/admin.actions';
import { RemoveReservation, RemoveReservationFailed, UserStateActions } from '../actions/user.actions';
import { AppState } from '../reducers';
import { StateUser } from '../reducers/user.reducers';

@Injectable()
export class DeleteReservationEffect {
    @Effect({dispatch: false})
    public deleteReservation$: Observable<Observable<RemoveGymSuccess>> = this.actions$.pipe(
        ofType(UserStateActions.RemoveReservation),
         map((data: RemoveReservation) => {
             return this.userService.removeReservation(data.payload)
             .pipe(
                 map(() => {
                     return new RemoveGymSuccess();
                 }),
             );
         }), catchError(( error, caught ) => {
           this.store$.dispatch(new RemoveReservationFailed(error));
           return caught;
         }),
    );
      constructor(
    private actions$: Actions,
    private userService: UserService,
    public state: State<StateUser>,
    private store$: Store<AppState>,
  ) {}
}
