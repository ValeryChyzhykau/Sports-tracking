import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UpdateReservation, UpdateReservationFailed, UpdateReservationSuccess, UserStateActions } from '../actions/user.actions';
import { StateUser } from '../reducers/user.reducers';

@Injectable()
export class UpdateReservationEffect {
  @Effect({ dispatch: false })
  public updateReservation$: any = this.actions$.pipe(
    ofType(UserStateActions.UpdateReservation),
    map((data: UpdateReservation) =>
      this.userService
        .updateReservation(data.id, data.payload)
        .pipe(map((result) => new UpdateReservationSuccess(result))),
    ),
    catchError((error) => of(new UpdateReservationFailed(error))),
  );
  constructor(
    private actions$: Actions,
    private userService: UserService,
    public state: State<StateUser>,
  ) {}
}
