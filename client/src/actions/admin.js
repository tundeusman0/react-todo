import axios from 'axios';
import userTokenConfig from '../selectors/userTokenConfig';
import {
  Admin_Loaded,
  Admin_Loadng,
  Admin_Delete_User,
  Admin_Error
} from './types';

export const adminGet = () => async (dispatch, getState) => {
  dispatch({ type: Admin_Loadng });
  try {
    const res = await axios.get('api/admin', userTokenConfig(getState));
    dispatch({ type: Admin_Loaded, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: Admin_Error });
    console.log('you are not an admin');
  }
};

export const adminDeleteUser = id => async (dispatch, getState) => {
  try {
    await axios.delete(`api/admin/${id}`, userTokenConfig(getState));
    dispatch({ type: Admin_Delete_User, id });
  } catch (error) {
    console.log(error);
    dispatch({ type: Admin_Error });
    console.log('you are not an admin');
  }
};
