import axios from 'axios';
import tokenConfig from '../selectors/tokenConfig';
import todoTokenConfig from '../selectors/todoTokenConfig';
import { returnAuthError, GetUserFail } from './authError';
import {
  Add_User,
  Login_User,
  Logout_User,
  Get_User,
  User_Log_Fail,
  User_Reg_Fail,
  User_Auth_Success,
  Todo_Logout,
  User_Loading
} from './types';

export const setLoadUser = () => ({
  type: User_Loading
});

export const getUser = () => async (dispatch, getState) => {
  dispatch(setLoadUser());
  try {
    const res = await axios.get('/api/user', tokenConfig(getState));
    if (!res) {
      throw new Error();
    }
    dispatch({ type: Get_User, payload: res.data });
    dispatch({ type: User_Auth_Success });
  } catch (error) {
    let msg = '',
      status = 0;
    if (error.message === 'Request failed with status code 406') {
      msg = 'not authorized';
      status = 406;
    } else {
      msg = 'not authorized';
      status = 400;
    }
    dispatch({ type: User_Log_Fail });
    dispatch(GetUserFail({ status, msg }));
  }
};

export const addUser = (payload = {}) => async dispatch => {
  try {
    const res = await axios.post('/api/user', payload);
    dispatch({ type: Add_User, payload: res.data });
    dispatch({ type: User_Auth_Success });
  } catch (error) {
    let msg = '',
      status = '';
    if (error.message === 'Request failed with status code 406') {
      msg = 'Fill all Fields';
      status = '406';
    } else if (error.message === 'Request failed with status code 409') {
      msg = 'User already Exists';
      status = '409';
    } else {
      msg = `Unable to register`;
      status = '400';
    }
    dispatch(returnAuthError({ status, msg, id: 'REGISTER_FAIL' }));
    dispatch({ type: User_Reg_Fail });
  }
};

export const loginUser = (payload = {}) => async dispatch => {
  try {
    const res = await axios.post('/api/user/login', payload);
    dispatch({ type: Login_User, payload: res.data });
    dispatch({ type: User_Auth_Success });
  } catch (error) {
    let msg = '',
      status = '';
    if (error.message === 'Request failed with status code 406') {
      msg = 'Fill all Fields';
      status = '406';
    } else {
      msg = `Unable to Login`;
      status = '400';
    }
    dispatch(returnAuthError({ status, msg, id: 'LOGIN_FAIL' }));
    dispatch({ type: User_Log_Fail });
  }
};

export const logoutUser = () => dispatch => {
  dispatch({ type: Todo_Logout });
  dispatch({ type: Logout_User });
};

export const editUser = payload => async (dispatch, getState) => {
  const token = getState().auth.token;
  try {
    const res = await axios.patch(
      `/api/user/`,
      payload.updates,
      todoTokenConfig(getState)
    );
    const user = res.data;
    dispatch({ type: 'EDIT_USER', payload: { user, token } });
    dispatch({ type: User_Auth_Success });
  } catch (error) {
    let msg = '',
      status = '';
    if (error.message === 'Request failed with status code 406') {
      msg = 'Fill all Fields';
      status = '406';
    } else if (error.message === 'Request failed with status code 409') {
      msg = 'User already Exists';
      status = '409';
    } else if (error.message === 'Request failed with status code 404') {
      msg = 'Atleast Change your UserName';
      status = '404';
    } else {
      msg = `Unable to Update, Atleast Change your UserName`;
      status = '400';
    }
    dispatch(
      returnAuthError({
        status,
        msg,
        id: 'EDIT_FAIL'
      })
    );
  }
};

export const deleteSelf = () => async (dispatch, getState) => {
  try {
    await axios.delete('api/user', todoTokenConfig(getState));
    dispatch({ type: Todo_Logout });
    dispatch({ type: Logout_User });
  } catch (error) {
    dispatch({ type: Todo_Logout });
    dispatch({ type: Logout_User });
  }
};
