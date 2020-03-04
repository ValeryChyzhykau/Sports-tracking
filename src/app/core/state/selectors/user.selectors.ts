import { AdminModel } from '@src/app/modules/home/interfaces/admin-model.interface';
import { UserModel } from '@src/app/modules/home/interfaces/user-model.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateUser, userNode } from '../reducers/user.reducers';

export const selectUsersReservationStateFeature = createFeatureSelector<
  StateUser
>(userNode);
export const selectUsersReservationsFeature = createFeatureSelector<StateUser>(
  userNode
);
export const selectUsersReservationsHoursFeature = createFeatureSelector<
  StateUser
>(userNode);
export const selectGymFeature = createFeatureSelector<StateUser>(userNode);
export const defaultOpenValueFeature = createFeatureSelector<StateUser>(
  userNode
);

export const selectUsersReservationStateEvents = createSelector(
  selectUsersReservationStateFeature,
  (state: StateUser): UserModel[] => state.reservationList
);

export const selectUsersReservations = createSelector(
  selectUsersReservationsFeature,
  (state: StateUser): UserModel => state.selectedReservation
);

export const selectGym = createSelector(
  selectGymFeature,
  (state: StateUser): AdminModel => state.selectedGym
);

export const defaultOpenValue = createSelector(
  selectGymFeature,
  (state: StateUser): Date => state.defaultOpenValue
);

export const selectUsersReservationsHours = createSelector(
  selectUsersReservationsHoursFeature,
  (state: StateUser): number[] => state.reservationHours
);
