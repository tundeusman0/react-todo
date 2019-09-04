import Cookie from 'js-cookie';
import {
  Add_User,
  Get_User,
  Login_User,
  Logout_User,
  User_Log_Fail,
  User_Reg_Fail
} from '../actions/types';

const inistialState = {
  token: Cookie.get('react-todo token'),
  isAthenticated: null,
  user: null
};

export default (state = inistialState, action) => {
  switch (action.type) {
    case Get_User:
      return {
        ...state,
        isAthenticated: true,
        user: action.payload
      };
    case Login_User:
    case Add_User:
      //   set cookie to expire in one day
      Cookie.set('react-todo token', action.payload.token, { expires: 1 });
      return {
        ...state,
        isAthenticated: true,
        user: action.payload
      };
    case User_Reg_Fail:
    case User_Log_Fail:
    case Logout_User:
      Cookie.remove('react-todo token');
      return {
        ...state,
        isAthenticated: false,
        user: null
      };
    default:
      return state;
  }
};