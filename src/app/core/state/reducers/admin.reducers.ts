import { AdminStateActions, AdminUnion } from '../actions/admin.actions';

export interface StateAdmin {
    adminState: boolean;
    imgArray: any[];
    searchValue: any;
    selectedPicture: string;
    newGym: any;
    receivedGyms: any;
    deleted: boolean;
    selectedId: string;
    updated: boolean;
}

export const adminNode = 'stateAdmin';

export const initialState: StateAdmin = {
    adminState: false,
    imgArray: [],
    searchValue: '',
    selectedPicture: '',
    newGym: {},
    receivedGyms: [],
    deleted: false,
    updated: false,
    selectedId: '',
};

export const stateAdmin = (
    state = initialState,
    action: AdminUnion,
): StateAdmin => {
    switch (action.type) {
        case AdminStateActions.UpdateGymSuccess: {
            return {
                ...state,
                updated: true,
            };
        }
        case AdminStateActions.GettingIdentifier: {
            return {
                ...state,
                selectedId:  action.id,
            };
        }
        case AdminStateActions.RemoveGymSuccess: {
            return {
                ...state,
                deleted: true,
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
