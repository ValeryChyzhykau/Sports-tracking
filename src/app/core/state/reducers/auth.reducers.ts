import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  email: string | null;
  user: string | null;
  id: string | null;
  errorMessage: string | null;
}

export const authState = 'authState';

export const initialState: AuthState = {
  user: localStorage.getItem('userToken'),
  email: localStorage.getItem('userEmail'),
  id: localStorage.getItem('userId'),
  errorMessage: null
};
export const authInformation = (
  state = initialState,
  action: AuthActionsUnion
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LoginSuccessAction: {
      return {
        ...state,
        user: action.payload.user,
        id: action.payload.id
      };
    }
    case AuthActionTypes.LogoutSuccessAction: {
      return {
        ...state,
        user: action.payload.user,
        id: action.payload.id
      };
    }
    case AuthActionTypes.SignUpSuccessAction: {
      return {
        ...state,
        user: action.payload.user,
        id: action.payload.id
      };
    }
    default: {
      return state;
    }
  }
};
