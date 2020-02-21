import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { LoadReservationListFailed, LoadReservationListSuccess, UserStateActions } from '../actions/user.actions';

@Injectable()
export class LoadReservationListEffect {
  @Effect()
  public loadReservationList$: any = this.actions$.pipe(
    ofType(UserStateActions.LoadReservationList),
    mergeMap(() =>
      this.userService.getReservation().pipe(
        map((data) => {
          console.log(data);
          return new LoadReservationListSuccess(data);
        }),
      ),
    ),
    catchError((error) => of(new LoadReservationListFailed(error))),
  );
  constructor(private actions$: Actions, private userService: UserService) {}
}
