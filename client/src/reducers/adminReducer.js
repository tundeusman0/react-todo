import {
  Admin_Loaded,
  Admin_Error,
  Admin_Loadng,
  Admin_Delete_User
} from '../actions/types';

const initialState = {
  users: [],
  isLoading: false,
  adminError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Admin_Loadng:
      return {
        ...state,
        isLoading: true,
        adminError: false
      };
    case Admin_Loaded:
      return {
        ...state,
        users: [...action.payload.users],
        isLoading: false,
        adminError: false
      };
    case Admin_Error:
      return {
        adminError: true
      };
    case Admin_Delete_User:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.id),
        isLoading: false
      };
    default:
      return state;
  }
};
