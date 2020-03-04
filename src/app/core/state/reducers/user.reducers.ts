import {
  UserStateActions,
  UserActionsUnion
} from '@core/state/actions/user.actions';
import { AdminModel } from '@src/app/modules/home/interfaces/admin-model.interface';
import { UserModel } from '@src/app/modules/home/interfaces/user-model.interface';

export interface StateUser {
  reservationList: UserModel[];
  reservationHours: number[];
  selectedReservation: UserModel;
  selectedGym: AdminModel;
  defaultOpenValue: Date;
}

export const userNode = 'stateUser';

export const initialState: StateUser = {
  reservationList: [],
  reservationHours: [],
  selectedReservation: {},
  selectedGym: {
    gymName: '',
    img: '',
    maximumNumberOfPeople: 0,
    price: 0
  },
  defaultOpenValue: new Date(0, 0, 0, 0, 0, 0)
};

export const stateUser = (
  state = initialState,
  action: UserActionsUnion
): StateUser => {
  switch (action.type) {
    case UserStateActions.LoadReservationListSuccessAction: {
      return {
        ...state,
        reservationList: action.payload
      };
    }

    case UserStateActions.GettingSelectedReservationAction: {
      return {
        ...state,
        selectedReservation: action.payload
      };
    }

    case UserStateActions.GettingSelectedReservationSuccessAction: {
      return {
        ...state,
        reservationHours: action.payload
      };
    }

    case UserStateActions.GettingInformationAboutTheSelectedGymAction: {
      return {
        ...state,
        selectedGym: action.payload
      };
    }

    default:
      return state;
  }
};
