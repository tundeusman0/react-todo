import axios from 'axios';
import todoTokenConfig from '../selectors/todoTokenConfig';

export const adminGet = () => async (dispatch, getState) => {
  dispatch({ type: 'ADMIN_LOADING' });
  try {
    const res = await axios.get('api/admin', todoTokenConfig(getState));
    dispatch({ type: 'ADMIN_LOADED', payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'ADMIN_ERROR' });
    console.log('you are not an admin');
  }
};
