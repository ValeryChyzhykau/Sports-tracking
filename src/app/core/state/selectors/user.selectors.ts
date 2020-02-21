import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateUser, userNode } from '../reducers/user.reducers';

export const selectUsersReservationStateFeature = createFeatureSelector<StateUser>(userNode);
export const selectUsersReservationsFeature = createFeatureSelector<StateUser>(userNode);
export const selectGymFeature = createFeatureSelector<StateUser>(userNode);
export const defaultOpenValueFeature = createFeatureSelector<StateUser>(userNode);

export const selectUsersReservationStateEvents = createSelector(
    selectUsersReservationStateFeature,
    (state: StateUser): any => state.reservationList,
);

export const selectUsersReservations = createSelector(
    selectUsersReservationsFeature,
    (state: StateUser): any => state.selectedReservation,
);

export const selectGym = createSelector(
    selectGymFeature,
    (state: StateUser): any => state.selectedGym,
);

export const defaultOpenValue = createSelector(
    selectGymFeature,
    (state: StateUser): Date => state.defaultOpenValue,
);