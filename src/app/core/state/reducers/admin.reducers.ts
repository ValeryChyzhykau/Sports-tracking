import { AdminModel } from '@src/app/modules/home/interfaces/admin-model.interface';
import { AdminStateActions, AdminActionsUnion } from '../actions/admin.actions';

export interface StateAdmin {
  blockedHours: number[];
  adminState: boolean;
  imgArray: string[];
  searchValue: string;
  selectedPicture: string;
  receivedGyms: AdminModel[];
  selectedId: string;
}

export const adminNode = 'stateAdmin';

export const initialState: StateAdmin = {
  blockedHours: [],
  adminState: false,
  imgArray: [],
  searchValue: '',
  selectedPicture: '',
  receivedGyms: [],
  selectedId: ''
};

export const stateAdmin = (
  state = initialState,
  action: AdminActionsUnion
): StateAdmin => {
  switch (action.type) {
    case AdminStateActions.ReservationLoadingForSelectedDateSuccessAction: {
      return {
        ...state,
        blockedHours: action.payload
      };
    }
    case AdminStateActions.GettingIdentifierAction: {
      return {
        ...state,
        selectedId: action.id
      };
    }
    case AdminStateActions.LoadGymListSuccessAction: {
      return {
        ...state,
        receivedGyms: action.payload
      };
    }
    case AdminStateActions.LoadAdminSuccessAction: {
      return {
        ...state,
        adminState: action.payload
      };
    }
    case AdminStateActions.SearchImagesUnsplashAction: {
      return {
        ...state,
        searchValue: action.payload
      };
    }
    case AdminStateActions.LoadImagesUnsplashSuccessAction: {
      return {
        ...state,
        imgArray: action.payload
      };
    }
    case AdminStateActions.AddingNewPictureAction: {
      return {
        ...state,
        selectedPicture: action.payload
      };
    }
    default:
      return state;
  }
};
