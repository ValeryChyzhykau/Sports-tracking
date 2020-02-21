import { Action } from '@ngrx/store';

export enum UserStateActions {
    LoadReservationListFailed = '[User] LoadReservationListFailed',
    LoadReservationListSuccess = '[User] LoadReservationListSuccess',
    LoadReservationList = '[User]  LoadReservationList',
    AddNewReservation = '[User] AddNewReservation',
    AddNewReservationSuccess = '[User] AddNewReservationSuccess',
    AddNewReservationFailed = '[User]  AddNewReservationFailed',
    RemoveReservation = '[User] RemoveReservation',
    RemoveReservationSuccess = '[User] RemoveReservationSuccess',
    RemoveReservationFailed = '[User] RemoveReservationFailed',
    UpdateReservation = '[User] UpdateReservation',
    UpdateReservationSuccess = '[User] UpdateReservationSuccess',
    UpdateReservationFailed = '[User] UpdateReservationFailed',
    GettingInformationAboutTheSelectedGym = '[User] GettingInformationAboutTheSelectedGym',
    GettingPrice = '[User]  GettingPrice',
    GettingSelectedReservation = '[User] GettingSelectedId',
}

export class LoadReservationList implements Action {
    public readonly type: UserStateActions.LoadReservationList =
    UserStateActions.LoadReservationList;
  }

export class LoadReservationListSuccess implements Action {
    public readonly type: UserStateActions.LoadReservationListSuccess =
      UserStateActions.LoadReservationListSuccess;
    constructor(public payload: any) {}
  }

export class LoadReservationListFailed implements Action {
    public readonly type: UserStateActions.LoadReservationListFailed =
      UserStateActions.LoadReservationListFailed;
    constructor(public payload: any) {}
  }

export class AddNewReservation implements Action {
    public readonly type: UserStateActions.AddNewReservation =
      UserStateActions.AddNewReservation;
    constructor(public payload: any) {}
  }

export class AddNewReservationSuccess implements Action {
    public readonly type: UserStateActions.AddNewReservationSuccess =
    UserStateActions.AddNewReservationSuccess;
    constructor(public payload: any) {}
  }

export class AddNewReservationFailed implements Action {
    public readonly type: UserStateActions.AddNewReservationFailed =
      UserStateActions.AddNewReservationFailed;
    constructor(public payload: any) {}
  }

export class RemoveReservation implements Action {
    public readonly type: UserStateActions.RemoveReservation =
      UserStateActions.RemoveReservation;
    constructor(public payload: any) {}
  }

export class RemoveReservationSuccess implements Action {
    public readonly type: UserStateActions.RemoveReservationSuccess =
    UserStateActions.RemoveReservationSuccess;
    constructor(public payload: any) {}
  }

export class RemoveReservationFailed implements Action {
    public readonly type: UserStateActions.RemoveReservationFailed =
      UserStateActions.RemoveReservationFailed;
    constructor(public payload: any) {}
  }

export class UpdateReservation implements Action {
    public readonly type: UserStateActions.UpdateReservation =
      UserStateActions.UpdateReservation;
    constructor(public id: string, public payload: any) {}
  }

export class UpdateReservationSuccess implements Action {
    public readonly type: UserStateActions.UpdateReservationSuccess =
    UserStateActions.UpdateReservationSuccess;
    constructor(public payload: any) {}
  }

export class UpdateReservationFailed implements Action {
    public readonly type: UserStateActions.UpdateReservationFailed =
      UserStateActions.UpdateReservationFailed;
    constructor(public payload: any) {}
  }

export class GettingInformationAboutTheSelectedGym implements Action {
    public readonly type: UserStateActions.GettingInformationAboutTheSelectedGym =
    UserStateActions.GettingInformationAboutTheSelectedGym;
    constructor(public payload: any) {}
  }

export class  GettingSelectedReservation implements Action {
    public readonly type: UserStateActions. GettingSelectedReservation =
    UserStateActions. GettingSelectedReservation;
    constructor(public id: string) {}
  }

export type UserUnion =
| LoadReservationList
| LoadReservationListSuccess
| LoadReservationListFailed
| AddNewReservation
| AddNewReservationSuccess
| AddNewReservationFailed
| RemoveReservation
| RemoveReservationSuccess
| RemoveReservationFailed
| UpdateReservation
| UpdateReservationSuccess
| UpdateReservationFailed
| GettingInformationAboutTheSelectedGym
|  GettingSelectedReservation;
