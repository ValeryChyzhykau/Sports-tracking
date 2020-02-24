import { UserStateActions, UserUnion } from '@core/state/actions/user.actions';
import { AdminData } from '../../interfaces/admin-data.interface';
import { UserData } from '../../interfaces/user-data.interface';

export interface StateUser {
   reservationList: UserData[];
   selectedReservation: UserData;
   selectedGym: AdminData;
   defaultOpenValue: Date;
}

export const userNode = 'stateUser';

export const initialState: StateUser = {
    reservationList: [],
    selectedReservation: {},
    selectedGym: {
        gymName: '',
        img: '',
        maximumNumberOfPeople: 0,
        price: 0,
    },
    defaultOpenValue: new Date(0, 0, 0, 0, 0, 0),
};

export const stateUser = (
    state = initialState,
    action: UserUnion,
): StateUser => {
    switch (action.type) {
        case UserStateActions.LoadReservationListSuccess: {
            return {
                ...state,
                reservationList: action.payload,
            };
        }
        case UserStateActions.GettingSelectedReservation: {
            return {
                ...state,
                selectedReservation: action.payload,
            };
        }
        case UserStateActions.GettingInformationAboutTheSelectedGym: {
            return {
                ...state,
                selectedGym: action.payload,
            };
        }
         default: return state;
    }
};
