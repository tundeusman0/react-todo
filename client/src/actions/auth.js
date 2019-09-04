import axios from 'axios';
import tokenConfig from '../selectors/tokenConfig';
import { returnAuthError, GetUserFail } from './authError';
import {
  Add_User,
  Login_User,
  Logout_User,
  Get_User,
  User_Log_Fail,
  User_Reg_Fail,
  User_Auth_Success
} from './types';

export const getUser = () => async (dispatch, getState) => {
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
  dispatch({ type: Logout_User });
};