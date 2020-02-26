import { Injectable } from '@angular/core';
import { UserData } from '@modules/home/interfaces/user-data.interface';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, State, Store } from '@ngrx/store';
import { catchError, map, withLatestFrom } from 'rxjs/operators';
import {
    GettingSelectedReservation,
     GettingSelectedReservationFailed,
      GettingSelectedReservationSuccess,
       UserStateActions } from '../actions/user.actions';
import { AppState } from '../reducers';
import { StateAdmin } from '../reducers/admin.reducers';
import { StateUser } from '../reducers/user.reducers';
import { selectUsersReservationStateEvents } from '../selectors/user.selectors';

@Injectable()
export class GettingInformationUserEffect {
  @Effect()
  public gettingInfromation: any = this.actions$.pipe(
    ofType(UserStateActions.GettingSelectedReservation),
    map((data: GettingSelectedReservation) =>  data.payload),
    withLatestFrom(
      this.storeUser$.pipe(select(selectUsersReservationStateEvents)),
    ),
    map(([data, allReservations]) => {
      const result: number[] = [];
      allReservations.forEach((elem: UserData) => {
        if (elem.reservationDate === data.reservationDate && elem.gym === data.gym && elem.email !== data.email) {
          const from = elem.from;
          let to = elem.to;
          while (to >= from) {
            result.push(to);
            to = to - 1;
          }
        }
      });
      return new GettingSelectedReservationSuccess(result);
    }),
    catchError((error, caught) => {
      this.store$.dispatch(new GettingSelectedReservationFailed(error));
      return caught;
    }),
  );
  constructor(
    private actions$: Actions,
    private storeUser$: Store<StateUser>,
    public state: State<StateAdmin>,
    private store$: Store<AppState>,
  ) {}
}
