import { All, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  user: any;
  email: string;
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
            return {
                ...state,
                user: action.payload,
            };
        }
        case AuthActionTypes.Logout: {
            return {
                ...state,
                user: undefined,
            };
        }
        case AuthActionTypes.SignUp: {
            return {
                ...state,
                user: action.payload.email,
            };
        }
        default: {
            return state;
          }
    }
};
