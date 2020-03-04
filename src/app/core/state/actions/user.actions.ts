import { AdminModel } from '@src/app/modules/home/interfaces/admin-model.interface';
import { UserModel } from '@src/app/modules/home/interfaces/user-model.interface';
import { Action } from '@ngrx/store';

export enum UserStateActions {
  LoadReservationListFailedAction = '[User] LoadReservationListFailedAction',
  LoadReservationListSuccessAction = '[User] LoadReservationListSuccessAction',
  LoadReservationListAction = '[User]  LoadReservationListAction',
  CreateNewReservationAction = '[User] CreateNewReservationAction',
  CreateNewReservationSuccessAction = '[User] CreateNewReservationSuccessAction',
  CreateNewReservationFailedAction = '[User]  CreateNewReservationFailedAction',
  RemoveReservationAction = '[User] RemoveReservationAction',
  RemoveReservationSuccessAction = '[User] RemoveReservationSuccessAction',
  RemoveReservationFailedAction = '[User] RemoveReservationFailedAction',
  UpdateReservationAction = '[User] UpdateReservationAction',
  UpdateReservationSuccessAction = '[User] UpdateReservationSuccessAction',
  UpdateReservationFailedAction = '[User] UpdateReservationFailedAction',
  GettingInformationAboutTheSelectedGymAction = '[User] GettingInformationAboutTheSelectedGymAction',
  GettingPriceAction = '[User]  GettingPriceAction',
  GettingSelectedReservationAction = '[User] GettingSelectedReservationAction',
  GettingSelectedReservationSuccessAction = '[User] GettingSelectedReservationSuccessAction',
  GettingSelectedReservationFailedAction = '[User] GettingSelectedReservationFailedAction'
}

export class LoadReservationListAction implements Action {
  public readonly type: UserStateActions.LoadReservationListAction =
    UserStateActions.LoadReservationListAction;
}

export class LoadReservationListSuccessAction implements Action {
  public readonly type: UserStateActions.LoadReservationListSuccessAction =
    UserStateActions.LoadReservationListSuccessAction;
  constructor(public payload: UserModel[]) {}
}

export class LoadReservationListFailedAction implements Action {
  public readonly type: UserStateActions.LoadReservationListFailedAction =
    UserStateActions.LoadReservationListFailedAction;
  constructor(public payload: Error) {}
}

export class CreateNewReservationAction implements Action {
  public readonly type: UserStateActions.CreateNewReservationAction =
    UserStateActions.CreateNewReservationAction;
  constructor(public payload: UserModel) {}
}

export class CreateNewReservationSuccessAction implements Action {
  public readonly type: UserStateActions.CreateNewReservationSuccessAction =
    UserStateActions.CreateNewReservationSuccessAction;
}

export class CreateNewReservationFailedAction implements Action {
  public readonly type: UserStateActions.CreateNewReservationFailedAction =
    UserStateActions.CreateNewReservationFailedAction;
  constructor(public payload: Error) {}
}

export class RemoveReservationAction implements Action {
  public readonly type: UserStateActions.RemoveReservationAction =
    UserStateActions.RemoveReservationAction;
  constructor(public payload: any) {}
}

export class RemoveReservationSuccessAction implements Action {
  public readonly type: UserStateActions.RemoveReservationSuccessAction =
    UserStateActions.RemoveReservationSuccessAction;
}

export class RemoveReservationFailedAction implements Action {
  public readonly type: UserStateActions.RemoveReservationFailedAction =
    UserStateActions.RemoveReservationFailedAction;
  constructor(public payload: Error) {}
}

export class UpdateReservationAction implements Action {
  public readonly type: UserStateActions.UpdateReservationAction =
    UserStateActions.UpdateReservationAction;
  constructor(public id: string, public payload: UserModel) {}
}

export class UpdateReservationSuccessAction implements Action {
  public readonly type: UserStateActions.UpdateReservationSuccessAction =
    UserStateActions.UpdateReservationSuccessAction;
}

export class UpdateReservationFailedAction implements Action {
  public readonly type: UserStateActions.UpdateReservationFailedAction =
    UserStateActions.UpdateReservationFailedAction;
  constructor(public payload: Error) {}
}

export class GettingInformationAboutTheSelectedGymAction implements Action {
  public readonly type: UserStateActions.GettingInformationAboutTheSelectedGymAction =
    UserStateActions.GettingInformationAboutTheSelectedGymAction;
  constructor(public payload: AdminModel) {}
}

export class GettingSelectedReservationAction implements Action {
  public readonly type: UserStateActions.GettingSelectedReservationAction =
    UserStateActions.GettingSelectedReservationAction;
  constructor(public payload: UserModel) {}
}
export class GettingSelectedReservationSuccessAction implements Action {
  public readonly type: UserStateActions.GettingSelectedReservationSuccessAction =
    UserStateActions.GettingSelectedReservationSuccessAction;
  constructor(public payload: number[]) {}
}
export class GettingSelectedReservationFailedAction implements Action {
  public readonly type: UserStateActions.GettingSelectedReservationFailedAction =
    UserStateActions.GettingSelectedReservationFailedAction;
  constructor(public payload: Error) {}
}

export type UserActionsUnion =
  | LoadReservationListAction
  | LoadReservationListSuccessAction
  | LoadReservationListFailedAction
  | CreateNewReservationAction
  | CreateNewReservationSuccessAction
  | CreateNewReservationFailedAction
  | RemoveReservationAction
  | RemoveReservationSuccessAction
  | RemoveReservationFailedAction
  | UpdateReservationAction
  | UpdateReservationSuccessAction
  | UpdateReservationFailedAction
  | GettingInformationAboutTheSelectedGymAction
  | GettingSelectedReservationAction
  | GettingSelectedReservationSuccessAction
  | GettingSelectedReservationFailedAction;
