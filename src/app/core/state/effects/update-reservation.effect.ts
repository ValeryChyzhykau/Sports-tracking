import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UpdateReservation, UpdateReservationFailed, UpdateReservationSuccess, UserStateActions } from '../actions/user.actions';
import { AppState } from '../reducers';
import { StateUser } from '../reducers/user.reducers';

@Injectable()
export class UpdateReservationEffect {
  @Effect({ dispatch: false })
  public updateReservation$: Observable<Observable<UpdateReservationSuccess>> = this.actions$.pipe(
    ofType(UserStateActions.UpdateReservation),
    map((data: UpdateReservation) =>
      this.userService
        .updateReservation(data.id, data.payload)
        .pipe(map(() => new UpdateReservationSuccess())),
    ),
    catchError((error, caught) => {
      this.store$.dispatch(new UpdateReservationFailed(error));
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
