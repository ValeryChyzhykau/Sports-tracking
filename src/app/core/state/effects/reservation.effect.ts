import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  mergeMap
} from 'rxjs/operators';
import { UserService } from '../../services/user-service/user.service';
import {
  CreateNewReservationAction,
  CreateNewReservationFailedAction,
  CreateNewReservationSuccessAction,
  UserStateActions,
  RemoveReservationAction,
  RemoveReservationSuccessAction,
  RemoveReservationFailedAction,
  GettingSelectedReservationAction,
  GettingSelectedReservationSuccessAction,
  GettingSelectedReservationFailedAction,
  LoadReservationListSuccessAction,
  LoadReservationListFailedAction,
  UpdateReservationAction,
  UpdateReservationSuccessAction,
  UpdateReservationFailedAction
} from '../actions/user.actions';
import { AppState } from '../reducers';
import { StateUser } from '../reducers/user.reducers';
import { selectUsersReservationStateEvents } from '../selectors/user.selectors';
import { UserModel } from '@src/app/modules/home/interfaces/user-model.interface';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Injectable()
export class ReservationEffect {
  @Effect({ dispatch: false })
  public addNewReservation: Observable<Action> = this.actions$.pipe(
    ofType(UserStateActions.CreateNewReservationAction),
    switchMap((data: CreateNewReservationAction) => {
      return this.userService
        .createReservation(
          data.payload.reservationDate,
          data.payload.initialTime,
          data.payload.endTime,
          data.payload.email,
          data.payload.paymentAmount,
          data.payload.numberOfPeople,
          data.payload.gym
        )
        .pipe(map(() => new CreateNewReservationSuccessAction()));
    }),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new CreateNewReservationFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public deleteReservation$: Observable<Action> = this.actions$.pipe(
    ofType(UserStateActions.RemoveReservationAction),
    switchMap((data: RemoveReservationAction) => {
      return this.userService.removeReservation(data.payload).pipe(
        map(() => {
          return new RemoveReservationSuccessAction();
        })
      );
    }),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new RemoveReservationFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public gettingInfromation: Observable<Action> = this.actions$.pipe(
    ofType(UserStateActions.GettingSelectedReservationAction),
    map((data: GettingSelectedReservationAction) => data.payload),
    withLatestFrom(
      this.storeUser$.pipe(select(selectUsersReservationStateEvents))
    ),
    map(([data, allReservations]) => {
      const result: number[] = [];
      allReservations.forEach((elem: UserModel) => {
        if (
          elem.reservationDate === data.reservationDate &&
          elem.gym === data.gym &&
          elem.email !== data.email
        ) {
          const from = elem.initialTime;
          let to = elem.endTime;
          while (to >= from) {
            result.push(to);
            to = to - 1;
          }
        }
      });
      return new GettingSelectedReservationSuccessAction(result);
    }),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new GettingSelectedReservationFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public loadReservationList$: Observable<Action> = this.actions$.pipe(
    ofType(UserStateActions.LoadReservationListAction),
    mergeMap(() =>
      this.userService
        .getReservation()
        .pipe(
          map((actions: Array<DocumentChangeAction<UserModel>>) => {
            return actions.map(
              (a: {
                payload: { doc: { data: () => UserModel; id: string } };
              }) => {
                const data = a.payload.doc.data() as UserModel;
                const id = a.payload.doc.id as string;
                return { id, ...data };
              }
            );
          })
        )
        .pipe(
          map((data: UserModel[]) => {
            return new LoadReservationListSuccessAction(data);
          })
        )
    ),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new LoadReservationListFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public updateReservation$: Observable<Action> = this.actions$.pipe(
    ofType(UserStateActions.UpdateReservationAction),
    switchMap((data: UpdateReservationAction) =>
      this.userService
        .updateReservation(data.id, data.payload)
        .pipe(map(() => new UpdateReservationSuccessAction()))
    ),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new UpdateReservationFailedAction(error));
      return caught;
    })
  );
  constructor(
    private actions$: Actions,
    private storeUser$: Store<StateUser>,
    private userService: UserService,
    private store$: Store<AppState>
  ) {}
}
