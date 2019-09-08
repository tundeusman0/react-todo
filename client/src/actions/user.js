import axios from 'axios';
import userTokenConfig from '../selectors/userTokenConfig';
import { returnAuthError } from './authError';
import { Logout_User, User_Auth_Success, Todo_Logout } from './types';

export const editUser = payload => async (dispatch, getState) => {
  const token = getState().auth.token;
  try {
    const res = await axios.patch(
      `/api/user/`,
      payload.updates,
      userTokenConfig(getState)
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
    await axios.delete('api/user', userTokenConfig(getState));
    dispatch({ type: Todo_Logout });
    dispatch({ type: Logout_User });
  } catch (error) {
    dispatch({ type: Todo_Logout });
    dispatch({ type: Logout_User });
  }
};
