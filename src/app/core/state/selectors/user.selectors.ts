import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminData } from '../../interfaces/admin-data.interface';
import { UserData } from '../../interfaces/user-data.interface';
import { StateUser, userNode } from '../reducers/user.reducers';

export const selectUsersReservationStateFeature = createFeatureSelector<StateUser>(userNode);
export const selectUsersReservationsFeature = createFeatureSelector<StateUser>(userNode);
export const selectGymFeature = createFeatureSelector<StateUser>(userNode);
export const defaultOpenValueFeature = createFeatureSelector<StateUser>(userNode);

export const selectUsersReservationStateEvents = createSelector(
    selectUsersReservationStateFeature,
    (state: StateUser): UserData[] => state.reservationList,
);

export const selectUsersReservations = createSelector(
    selectUsersReservationsFeature,
    (state: StateUser): UserData => state.selectedReservation,
);

export const selectGym = createSelector(
    selectGymFeature,
    (state: StateUser): AdminData => state.selectedGym,
);

export const defaultOpenValue = createSelector(
    selectGymFeature,
    (state: StateUser): Date => state.defaultOpenValue,
);