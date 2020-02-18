import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { AdminStateActions, RemoveGym, RemoveGymFailed, RemoveGymSuccess } from '../actions/admin.actions';
import { StateAdmin } from '../reducers/admin.reducers';

@Injectable()
export class DeleteGymEffect {
  @Effect({dispatch: false})
  public deleteGym$: any = this.actions$.pipe(
    ofType(AdminStateActions.RemoveGym),
    map((data: RemoveGym) => {
      return this.adminService.deleteGym(data.id)
      .pipe(
        map((result) => {
          return new RemoveGymSuccess(result);
        }),
      );
    }), catchError((error) => of(new RemoveGymFailed(error))),
  );
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    public state: State<StateAdmin>,
  ) {}
}
