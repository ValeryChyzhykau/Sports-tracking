import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { AddNewGym, AddNewGymFailed, AdminStateActions } from '../actions/admin.actions';
import { StateAdmin } from '../reducers/admin.reducers';

@Injectable()
export class AddNewGymEffect {
  @Effect({dispatch: false})
  public addNewGym$: any = this.actions$.pipe(
    ofType(AdminStateActions.AddNewGym),
    map((data: AddNewGym) => {
      return this.adminService.createGym(
        data.payload.gymName,
        data.payload.maximumNumberOfPeople,
        data.payload.price,
        data.payload.img,
      );
    }), catchError((error) => of(new AddNewGymFailed(error))),
  );
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    public state: State<StateAdmin>,
  ) {}
}
