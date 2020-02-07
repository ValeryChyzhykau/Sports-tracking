import { All, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  errorMessage: string | null;
}

export const authState = 'authState';

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
  };
export const authInformation = (state = initialState, action: All): AuthState => {
    switch (action.type) {
        case AuthActionTypes.LoginSuccess: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        }
        case AuthActionTypes.Logout: {
            return initialState;
        }
        case AuthActionTypes.SignUpSuccess: {
            return {
                ...state,
                isAuthenticated: true,
            };
        }
        default: {
            return state;
          }
    }
};
