import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action, select } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators';
import { AdminService } from '../../services/admin-service/admin.service';
import {
  CreateNewGymAction,
  CreateNewGymSuccessAction,
  AdminStateActions,
  CreateNewGymFailedAction,
  RemoveGymSuccessAction,
  RemoveGymFailedAction,
  LoadGymListSuccessAction,
  LoadGymListFailedAction,
  LoadImagesUnsplashSuccessAction,
  LoadImagesUnsplashFailedAction,
  LoadAdminSuccessAction,
  LoadAdminFailedAction,
  UpdateGymSuccessAction,
  UpdateGymFailedAction,
  ReservationLoadingForSelectedDateAction,
  ReservationLoadingForSelectedDateSuccessAction,
  ReservationLoadingForSelectedDateFailedAction
} from '../actions/admin.actions';
import { AppState } from '../reducers';
import { AdminModel } from '@src/app/modules/home/interfaces/admin-model.interface';
import { UnspalshInterface } from '@src/app/modules/home/interfaces/unsplash.interface';
import { ImageInterface } from '@src/app/modules/home/interfaces/image.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { StateUser } from '../reducers/user.reducers';
import { selectUsersReservationStateEvents } from '../selectors/user.selectors';
import { UserModel } from '@src/app/modules/home/interfaces/user-model.interface';

@Injectable()
export class GymEffect {
  @Effect()
  public addNewGym$: Observable<Action> = this.actions$.pipe(
    ofType(AdminStateActions.CreateNewGymAction),
    switchMap((data: CreateNewGymAction) => {
      return this.adminService
        .createGym(
          data.payload.gymName,
          data.payload.maximumNumberOfPeople,
          data.payload.price,
          data.payload.img
        )
        .pipe(map(() => new CreateNewGymSuccessAction()));
    }),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new CreateNewGymFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public deleteGym$: Observable<Action> = this.actions$.pipe(
    ofType(AdminStateActions.RemoveGymAction),
    switchMap((data: AdminModel) =>
      this.adminService
        .deleteGym(data.id)
        .pipe(map(() => new RemoveGymSuccessAction()))
    ),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new RemoveGymFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public loadNewGym$: Observable<Action> = this.actions$.pipe(
    ofType(AdminStateActions.LoadGymListAction),
    mergeMap(() =>
      this.adminService.loadingGyms().pipe(
        map((data: AdminModel[]) => {
          return new LoadGymListSuccessAction(data);
        })
      )
    ),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new LoadGymListFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public loadImg$: Observable<Action> = this.actions$.pipe(
    ofType(AdminStateActions.SearchImagesUnsplashAction),
    mergeMap((data: { payload: string }) => {
      return this.adminService.searchPhotos(data.payload).pipe(
        map((unsplash: UnspalshInterface) => {
          const result: string[] = [];
          unsplash.results.forEach((element: { urls: ImageInterface }) => {
            return result.push(element.urls.small);
          });
          return new LoadImagesUnsplashSuccessAction(result);
        })
      );
    }),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new LoadImagesUnsplashFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public adminStateValue$: Observable<Action> = this.actions$.pipe(
    ofType(AdminStateActions.LoadAdminAction),
    mergeMap(() =>
      from(
        new Promise((resolve): void => {
          this.afAuth.auth.onAuthStateChanged((user: firebase.User) => {
            user
              .getIdTokenResult(true)
              .then((res: firebase.auth.IdTokenResult) =>
                resolve(res.claims.admin)
              );
          });
        })
      ).pipe(map((data: boolean) => new LoadAdminSuccessAction(data)))
    ),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new LoadAdminFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public updateGym$: Observable<Action> = this.actions$.pipe(
    ofType(AdminStateActions.UpdateGymAction),
    switchMap((data: { id: string; payload: AdminModel }) =>
      this.adminService
        .updateGym(data.id, data.payload)
        .pipe(map(() => new UpdateGymSuccessAction()))
    ),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(new UpdateGymFailedAction(error));
      return caught;
    })
  );

  @Effect()
  public loadReservation$: Observable<Action> = this.actions$.pipe(
    ofType(AdminStateActions.ReservationLoadingForSelectedDateAction),
    map((data: ReservationLoadingForSelectedDateAction) => {
      return { date: data.date, gymName: data.gymName };
    }),
    withLatestFrom(
      this.storeUser$.pipe(select(selectUsersReservationStateEvents))
    ),
    map(([data, allReservations]) => {
      const result: number[] = [];
      allReservations.forEach((elem: UserModel) => {
        if (elem.reservationDate === data.date && elem.gym === data.gymName) {
          const from = elem.initialTime;
          let to = elem.endTime;
          while (to >= from) {
            result.push(to);
            to = to - 1;
          }
        }
      });
      return new ReservationLoadingForSelectedDateSuccessAction(result);
    }),
    catchError((error: Error, caught: Observable<Action>) => {
      this.store$.dispatch(
        new ReservationLoadingForSelectedDateFailedAction(error)
      );
      return caught;
    })
  );
  constructor(
    private storeUser$: Store<StateUser>,
    private afAuth: AngularFireAuth,
    private actions$: Actions,
    private adminService: AdminService,
    private store$: Store<AppState>
  ) {}
}
