import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { AddNewGym, AddNewGymSuccess, AdminStateActions } from '../actions/admin.actions';
import { AddNewReservationFailed } from '../actions/user.actions';
import { AppState } from '../reducers';
import { StateAdmin } from '../reducers/admin.reducers';

@Injectable()
export class AddNewGymEffect {
  @Effect({dispatch: false})
  public addNewGym$: Observable<Observable<AddNewGymSuccess>> = this.actions$.pipe(
    ofType(AdminStateActions.AddNewGym),
    map((data: AddNewGym) => {
      return this.adminService.createGym(
        data.payload.gymName,
        data.payload.maximumNumberOfPeople,
        data.payload.price,
        data.payload.img,
      ).pipe(map(() => new AddNewGymSuccess()));
    }), catchError((error , caught) => {
      this.store$.dispatch(new AddNewReservationFailed(error));
      return caught;
    } ),
  );
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    public state: State<StateAdmin>,
    private store$: Store<AppState>,
  ) {}
}
