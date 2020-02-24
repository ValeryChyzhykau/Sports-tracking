import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserData } from '../../interfaces/user-data.interface';
import { UserService } from '../../services/user.service';
import { LoadReservationListFailed, LoadReservationListSuccess, UserStateActions } from '../actions/user.actions';
import { AppState } from '../reducers';

@Injectable()
export class LoadReservationListEffect {
  @Effect()
  public loadReservationList$: Observable<UserData | LoadReservationListSuccess> = this.actions$.pipe(
    ofType(UserStateActions.LoadReservationList),
    mergeMap(() =>
      this.userService.getReservation().pipe(
        map((data: UserData[]) => {
          return new LoadReservationListSuccess(data);
        }),
      ),
    ),
    catchError((error, caught) =>  {
      this.store$.dispatch(new LoadReservationListFailed(error));
      return caught;
    }),
  );
  constructor(private actions$: Actions, private userService: UserService, private store$: Store<AppState>) {}
}
