import { UserStateActions, UserUnion } from '@core/state/actions/user.actions';

export interface StateUser {
   reservationList: any;
   selectedReservation: any;
   selectedGym: any;
   defaultOpenValue: Date;
}

export const userNode = 'stateUser';

export const initialState: StateUser = {
    reservationList: [],
    selectedReservation: {},
    selectedGym: {},
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
                selectedReservation: action.id,
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
