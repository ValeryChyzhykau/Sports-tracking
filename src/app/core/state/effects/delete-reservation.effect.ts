import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { RemoveGymSuccess } from '../actions/admin.actions';
import { RemoveReservation, RemoveReservationFailed, UserStateActions } from '../actions/user.actions';
import { StateUser } from '../reducers/user.reducers';

@Injectable()
export class DeleteReservationEffect {
    @Effect({dispatch: false})
    public deleteReservation$: any = this.actions$.pipe(
        ofType(UserStateActions.RemoveReservation),
         map((data: RemoveReservation) => {
             return this.userService.removeReservation(data.payload)
             .pipe(
                 map((result) => {
                     return new RemoveGymSuccess(result);
                 }),
             );
         }), catchError((error) => of(new RemoveReservationFailed(error))),
    );
      constructor(
    private actions$: Actions,
    private userService: UserService,
    public state: State<StateUser>,
  ) {}
}
