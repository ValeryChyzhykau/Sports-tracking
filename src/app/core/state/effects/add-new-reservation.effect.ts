import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { AddNewReservation, AddNewReservationFailed, AddNewReservationSuccess, UserStateActions } from '../actions/user.actions';
import { AppState } from '../reducers';
import { StateAdmin } from '../reducers/admin.reducers';

@Injectable()
export class AddNewReservationEffect {
  @Effect({ dispatch: false })
  public addNewReservation: any = this.actions$.pipe(
    ofType(UserStateActions.AddNewReservation),
    map((data: AddNewReservation) => {
      return this.userService
        .createReservation(
          data.payload.reservationDate,
          data.payload.from,
          data.payload.to,
          data.payload.email,
          data.payload.paymentAmount,
          data.payload.numberOfPeople,
          data.payload.gym,
        )
        .pipe(map((result) => new AddNewReservationSuccess(result)));
    }),
    catchError((error, caught) => {
      this.store$.dispatch( new AddNewReservationFailed(error));
      return caught;
    }),
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    public state: State<StateAdmin>,
    private store$: Store<AppState>,
  ) {}
}
