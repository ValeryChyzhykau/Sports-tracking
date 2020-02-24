import { AdminStateActions, AdminUnion } from '../actions/admin.actions';

export interface StateAdmin {
    adminState: boolean;
    imgArray: string[];
    searchValue: any;
    selectedPicture: string;
    newGym: any;
    receivedGyms: any;
    selectedId: string;
}

export const adminNode = 'stateAdmin';

export const initialState: StateAdmin = {
    adminState: false,
    imgArray: [],
    searchValue: '',
    selectedPicture: '',
    newGym: {},
    receivedGyms: [],
    selectedId: '',
};

export const stateAdmin = (
    state = initialState,
    action: AdminUnion,
): StateAdmin => {
    switch (action.type) {
        case AdminStateActions.GettingIdentifier: {
            return {
                ...state,
                selectedId:  action.id,
            };
        }
        case AdminStateActions.LoadGymListSuccess: {
            return {
                ...state,
                receivedGyms: action.payload,
            };
        }
        case AdminStateActions.AddNewGym: {
            return {
                ...state,
                newGym: action.payload,
            };
        }
        case AdminStateActions.LoadAdminSuccess: {
            return {
                ...state,
                adminState: action.payload,
            };
        }
        case AdminStateActions.SearchImgUnsplash: {
            return {
                ...state,
                searchValue: action.payload,
            };
        }
        case AdminStateActions.LoadImgUnsplashSuccess: {
            return {
                ...state,
                imgArray: action.payload,
            };
        }
        case AdminStateActions.AddingNewPicture: {
            return {
                ...state,
                selectedPicture: action.payload,
            };
        }
        default: return state;
    }
};
