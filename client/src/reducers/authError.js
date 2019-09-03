import { User_Auth_Fail, Get_User_Fail } from '../actions/types';

const inistialState = {
  status: null,
  msg: null,
  id: null
};

export default (state = inistialState, action) => {
  switch (action.type) {
    case User_Auth_Fail:
    case Get_User_Fail:
      return {
        ...state,
        status: action.payload.status,
        msg: action.payload.msg,
        id: action.payload.id
      };
    default:
      return state;
  }
};
