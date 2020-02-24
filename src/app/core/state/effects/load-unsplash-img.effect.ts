import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ImageInterface } from '../../interfaces/image.interface';
import { UnspalshInterface } from '../../interfaces/unsplash.interface';
import { AdminService } from '../../services/admin.service';
import { AdminStateActions, LoadImgUnsplashFailed, LoadImgUnsplashSuccess, SearchImgUnsplash } from '../actions/admin.actions';
import { AppState } from '../reducers';
import { StateAdmin } from '../reducers/admin.reducers';

@Injectable()
export class LoadUnsplashImg {
  @Effect({})
  public loadImg$: Observable<LoadImgUnsplashSuccess> = this.actions$.pipe(
    ofType(AdminStateActions.SearchImgUnsplash),
    mergeMap((data: SearchImgUnsplash) => {
      return this.adminService.searchPhotos(data.payload).pipe(
        map((unsplash: UnspalshInterface) => {
          const result: string[] = [];
          unsplash.results.forEach((element: {urls: ImageInterface}) => {
            return result.push(element.urls.small);
          });
          return new LoadImgUnsplashSuccess(result);
        }),
      );
    }),
    catchError((error, caught) => {
      this.store$.dispatch(new LoadImgUnsplashFailed(error));
      return caught;
    }),
  );
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    public state: State<StateAdmin>,
    private store$: Store<AppState>,
  ) {}
}
