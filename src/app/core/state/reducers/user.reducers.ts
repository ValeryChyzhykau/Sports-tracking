import { UserStateActions, UserUnion } from '@core/state/actions/user.actions';
import { AdminData } from '@modules/home/interfaces/admin-data.interface';
import { UserData } from '@modules/home/interfaces/user-data.interface';

export interface StateUser {
   reservationList: UserData[];
   reservationHours: number[];
   selectedReservation: UserData;
   selectedGym: AdminData;
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
        case UserStateActions.GettingSelectedReservationSuccess: {
            return {
                ...state,
                reservationHours: action.payload,
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
