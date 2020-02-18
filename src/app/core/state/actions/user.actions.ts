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
    GettingInformationAboutTheSelectedGymSuccess = '[User] GettingInformationAboutTheSelectedGymSuccess',
    GettingInformationAboutTheSelectedGymFailed = '[User] GettingInformationAboutTheSelectedGymFailed',
}
