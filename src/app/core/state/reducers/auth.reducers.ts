import { All, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  email: string;
  user: any;
  id: string;
  errorMessage: string | null;
}

export const authState = 'authState';

export const initialState: AuthState = {
         user: localStorage.getItem('userToken'),
         email: localStorage.getItem('userEmail'),
         id: localStorage.getItem('userId'),
         errorMessage: null,
       };
export const authInformation = (state = initialState, action: All): AuthState => {
    switch (action.type) {
        case AuthActionTypes.LoginSuccess: {
            console.log(state);
            return {
                ...state,
                user: action.payload.token,
                id: action.payload.id,
            };
        }
        case AuthActionTypes.LogoutSuccess: {
            console.log(state);
            return {
                ...state,
                user: action.payload.user,
                id: action.payload.id,
            };
        }
        case AuthActionTypes.SignUpSuccess: {
            return {
                ...state,
                user: action.payload.token,
                id: action.payload.id,
            };
        }
        default: {
            return state;
          }
    }
};
