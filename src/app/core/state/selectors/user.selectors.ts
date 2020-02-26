import { AdminData } from '@modules/home/interfaces/admin-data.interface';
import { UserData } from '@modules/home/interfaces/user-data.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateUser, userNode } from '../reducers/user.reducers';

export const selectUsersReservationStateFeature = createFeatureSelector<StateUser>(userNode);
export const selectUsersReservationsFeature = createFeatureSelector<StateUser>(userNode);
export const selectUsersReservationsHoursFeature = createFeatureSelector<StateUser>(userNode);
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

export const selectUsersReservationsHours = createSelector(
    selectUsersReservationsHoursFeature,
    (state: StateUser): number[] => state.reservationHours,
);
