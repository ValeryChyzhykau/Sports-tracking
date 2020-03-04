import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminNode, StateAdmin } from '../reducers/admin.reducers';
import { AdminModel } from '@src/app/modules/home/interfaces/admin-model.interface';

export const selectAdminStateFeature = createFeatureSelector<StateAdmin>(
  adminNode
);
export const selectUnspalshFeature = createFeatureSelector<StateAdmin>(
  adminNode
);
export const selectPictureFeature = createFeatureSelector<StateAdmin>(
  adminNode
);
export const LoadedGymsFeature = createFeatureSelector<StateAdmin>(adminNode);
export const selectedIdFeature = createFeatureSelector<StateAdmin>(adminNode);
export const blockedHoursFeature = createFeatureSelector<StateAdmin>(adminNode);

export const selectAdminStateEvents = createSelector(
  selectAdminStateFeature,
  (state: StateAdmin): boolean => state.adminState
);

export const selectUnspalshEvents = createSelector(
  selectUnspalshFeature,
  (state: StateAdmin): string[] => state.imgArray
);

export const selectPicture = createSelector(
  selectPictureFeature,
  (state: StateAdmin): string => state.selectedPicture
);

export const LoadedGymsEvents = createSelector(
  LoadedGymsFeature,
  (state: StateAdmin): AdminModel[] => state.receivedGyms
);

export const selectedId = createSelector(
  selectedIdFeature,
  (state: StateAdmin): string => state.selectedId
);

export const blockedHoursEvents = createSelector(
  blockedHoursFeature,
  (state: StateAdmin): number[] => state.blockedHours
);
