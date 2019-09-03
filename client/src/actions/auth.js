import Cookie from 'js-cookie';
import { returnAuthError, GetUserFail } from './authError';
import {
  Add_User,
  Login_User,
  Logout_User,
  Get_User,
  User_Log_Fail,
  User_Reg_Fail
} from './types';

export const getUser = () => dispatch => {
  if (Cookie.get('react-todo token') !== undefined) {
    return dispatch({ type: Get_User });
  }
  dispatch(returnAuthError({ status: 400, msg: 'not authorized' }));
  dispatch(
    GetUserFail({
      status: 400,
      msg: 'not authorized',
      id: 'Unable to get user'
    })
  );
};

export const addUser = ({ payload } = {}) => dispatch => {
  dispatch({ type: Add_User, payload });
  dispatch({ type: User_Log_Fail });
  dispatch({ type: User_Reg_Fail });
};

export const loginUser = ({ payload } = {}) => dispatch => {
  dispatch({ type: Login_User, payload });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: Logout_User });
};
