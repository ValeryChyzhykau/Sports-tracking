import { Injectable } from "@angular/core";
import { UserData } from '@modules/home/interfaces/user-data.interface';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, State, Store } from '@ngrx/store';
import { catchError, map, withLatestFrom } from 'rxjs/operators';
import {
    AdminStateActions,
     ReservationLoadingForSelectedDate,
      ReservationLoadingForSelectedDateFailed,
       ReservationLoadingForSelectedDateSuccess,
 } from '../actions/admin.actions';
import { AppState } from '../reducers';
import { StateAdmin } from '../reducers/admin.reducers';
import { StateUser } from '../reducers/user.reducers';
import { selectUsersReservationStateEvents } from '../selectors/user.selectors';

@Injectable()
export class LoadReservationForDateClass {
  @Effect()
  public loadReservation$: any = this.actions$.pipe(
    ofType(AdminStateActions.ReservationLoadingForSelectedDate),
    map((data: ReservationLoadingForSelectedDate) => {
      return { date: data.date, gymName: data.gymName };
    }),
    withLatestFrom(
      this.storeUser$.pipe(select(selectUsersReservationStateEvents)),
    ),
    map(([data, allReservations]) => {
      const result: number[] = [];
      allReservations.forEach((elem: UserData) => {
        if (elem.reservationDate === data.date && elem.gym === data.gymName) {
          const from = elem.from;
          let to = elem.to;
          while (to >= from) {
            result.push(to);
            to = to - 1;
          }
        }
      });
      return new ReservationLoadingForSelectedDateSuccess(result);
    }),
    catchError((error, caught) => {
      this.store$.dispatch(new ReservationLoadingForSelectedDateFailed(error));
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
