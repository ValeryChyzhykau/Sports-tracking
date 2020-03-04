import { AdminModel } from '@src/app/modules/home/interfaces/admin-model.interface';
import { Action } from '@ngrx/store';

export enum AdminStateActions {
  LoadAdminSuccessAction = '[Admin] LoadAdminSuccessAction',
  LoadAdminFailedAction = '[Admin] LoadAdminFailedAction',
  LoadAdminAction = '[Admin] LoadAdminAction',
  LoadGymListFailedAction = '[Admin] LoadGymListFailedAction',
  LoadGymListSuccessAction = '[Admin] LoadGymListSuccessAction',
  LoadGymListAction = '[Admin] LoadGymListAction',
  CreateNewGymAction = '[Admin] CreateNewGymAction',
  CreateNewGymSuccessAction = '[Admin] CreateNewGymSuccessAction',
  CreateNewGymFailedAction = '[Admin] CreateNewGymFailedAction',
  LoadImagesUnsplashAction = '[Admin] LoadImgUnsplashAction',
  LoadImagesUnsplashSuccessAction = '[Admin] LoadImgUnsplashSuccessAction',
  LoadImagesUnsplashFailedAction = '[Admin] LoadImgUnsplashFailedAction',
  SearchImagesUnsplashAction = '[Admin] SearchImgUnsplashAction',
  AddingNewPictureAction = '[Admin] AddingNewPictureAction',
  RemoveGymAction = '[Admin] RemoveGymAction',
  RemoveGymSuccessAction = '[Admin] RemoveGymSuccessAction',
  RemoveGymFailedAction = '[Admin] RemoveGymFailedAction',
  GettingIdentifierAction = '[Admin] GettingIdentifierAction',
  UpdateGymAction = '[Admin] UpdateGymAction',
  UpdateGymSuccessAction = '[Admin] UpdateGymSuccessAction',
  UpdateGymFailedAction = '[Admin] UpdateGymFailedAction',
  ReservationLoadingForSelectedDateAction = '[Admin] ReservationLoadingForSelectedDateAction',
  ReservationLoadingForSelectedDateSuccessAction = '[Admin] ReservationLoadingForSelectedDateSuccessAction',
  ReservationLoadingForSelectedDateFailedAction = '[Admin] ReservationLoadingForSelectedDateFailedAction'
}

export class UpdateGymAction implements Action {
  public readonly type: AdminStateActions.UpdateGymAction =
    AdminStateActions.UpdateGymAction;
  constructor(public id: string, public payload: AdminModel) {}
}

export class UpdateGymSuccessAction implements Action {
  public readonly type: AdminStateActions.UpdateGymSuccessAction =
    AdminStateActions.UpdateGymSuccessAction;
}

export class UpdateGymFailedAction implements Action {
  public readonly type: AdminStateActions.UpdateGymFailedAction =
    AdminStateActions.UpdateGymFailedAction;
  constructor(public payload: Error) {}
}

export class GettingIdentifierAction implements Action {
  public readonly type: AdminStateActions.GettingIdentifierAction =
    AdminStateActions.GettingIdentifierAction;
  constructor(public id: string) {}
}

export class RemoveGymAction implements Action {
  public readonly type: AdminStateActions.RemoveGymAction =
    AdminStateActions.RemoveGymAction;
  constructor(public id: string) {}
}

export class RemoveGymSuccessAction implements Action {
  public readonly type: AdminStateActions.RemoveGymSuccessAction =
    AdminStateActions.RemoveGymSuccessAction;
}

export class RemoveGymFailedAction implements Action {
  public readonly type: AdminStateActions.RemoveGymFailedAction =
    AdminStateActions.RemoveGymFailedAction;
  constructor(public payload: Error) {}
}

export class AddingNewPictureAction implements Action {
  public readonly type: AdminStateActions.AddingNewPictureAction =
    AdminStateActions.AddingNewPictureAction;
  constructor(public payload: string) {}
}

export class LoadAdminAction implements Action {
  public readonly type: AdminStateActions.LoadAdminAction =
    AdminStateActions.LoadAdminAction;
}

export class LoadAdminSuccessAction implements Action {
  public readonly type: AdminStateActions.LoadAdminSuccessAction =
    AdminStateActions.LoadAdminSuccessAction;
  constructor(public payload: boolean) {}
}

export class LoadAdminFailedAction implements Action {
  public readonly type: AdminStateActions.LoadAdminFailedAction =
    AdminStateActions.LoadAdminFailedAction;
  constructor(public payload: Error) {}
}

export class LoadGymListAction implements Action {
  public readonly type: AdminStateActions.LoadGymListAction =
    AdminStateActions.LoadGymListAction;
}

export class LoadGymListSuccessAction implements Action {
  public readonly type: AdminStateActions.LoadGymListSuccessAction =
    AdminStateActions.LoadGymListSuccessAction;
  constructor(public payload: AdminModel[]) {}
}

export class LoadGymListFailedAction implements Action {
  public readonly type: AdminStateActions.LoadGymListFailedAction =
    AdminStateActions.LoadGymListFailedAction;
  constructor(public payload: Error) {}
}

export class CreateNewGymAction implements Action {
  public readonly type: AdminStateActions.CreateNewGymAction =
    AdminStateActions.CreateNewGymAction;
  constructor(public payload: AdminModel) {}
}
export class CreateNewGymSuccessAction implements Action {
  public readonly type: AdminStateActions.CreateNewGymSuccessAction =
    AdminStateActions.CreateNewGymSuccessAction;
}

export class CreateNewGymFailedAction implements Action {
  public readonly type: AdminStateActions.CreateNewGymFailedAction =
    AdminStateActions.CreateNewGymFailedAction;
  constructor(public payload: Error) {}
}

export class LoadImagesUnsplashFailedAction implements Action {
  public readonly type: AdminStateActions.LoadImagesUnsplashFailedAction =
    AdminStateActions.LoadImagesUnsplashFailedAction;
  constructor(public payload: Error) {}
}

export class LoadImagesUnsplashSuccessAction implements Action {
  public readonly type: AdminStateActions.LoadImagesUnsplashSuccessAction =
    AdminStateActions.LoadImagesUnsplashSuccessAction;
  constructor(public payload: string[]) {}
}

export class SearchImgUnsplashAction implements Action {
  public readonly type: AdminStateActions.SearchImagesUnsplashAction =
    AdminStateActions.SearchImagesUnsplashAction;
  constructor(public payload: string) {}
}

export class ReservationLoadingForSelectedDateAction implements Action {
  public readonly type: AdminStateActions.ReservationLoadingForSelectedDateAction =
    AdminStateActions.ReservationLoadingForSelectedDateAction;
  constructor(public date: string, public gymName: string) {}
}

export class ReservationLoadingForSelectedDateSuccessAction implements Action {
  public readonly type: AdminStateActions.ReservationLoadingForSelectedDateSuccessAction =
    AdminStateActions.ReservationLoadingForSelectedDateSuccessAction;
  constructor(public payload: number[]) {}
}

export class ReservationLoadingForSelectedDateFailedAction implements Action {
  public readonly type: AdminStateActions.ReservationLoadingForSelectedDateFailedAction =
    AdminStateActions.ReservationLoadingForSelectedDateFailedAction;
  constructor(public payload: Error) {}
}

export type AdminActionsUnion =
  | LoadAdminAction
  | LoadAdminFailedAction
  | LoadAdminSuccessAction
  | LoadGymListAction
  | LoadGymListSuccessAction
  | LoadGymListFailedAction
  | CreateNewGymAction
  | LoadImagesUnsplashSuccessAction
  | LoadImagesUnsplashFailedAction
  | SearchImgUnsplashAction
  | AddingNewPictureAction
  | RemoveGymAction
  | RemoveGymSuccessAction
  | RemoveGymFailedAction
  | CreateNewGymSuccessAction
  | CreateNewGymFailedAction
  | UpdateGymAction
  | UpdateGymSuccessAction
  | UpdateGymFailedAction
  | ReservationLoadingForSelectedDateFailedAction
  | ReservationLoadingForSelectedDateSuccessAction
  | ReservationLoadingForSelectedDateAction
  | GettingIdentifierAction;
