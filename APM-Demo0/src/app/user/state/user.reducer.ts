import { createFeatureSelector, createSelector } from "@ngrx/store";

import { User } from "../user";
import * as fromRoot from "../../state/app.state";
import * as UserActions from "./user.actions";

export interface State extends fromRoot.State {
  user: UserState;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: false,
  currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>("user");

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export function reducer(state = initialState, action) {
  switch (action.type) {
    case UserActions.UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}
