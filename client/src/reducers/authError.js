import { User_Auth_Fail, User_Auth_Success } from '../actions/types';

const inistialState = {
  status: null,
  msg: null,
  id: null
};

export default (state = inistialState, action) => {
  switch (action.type) {
    case User_Auth_Fail:
      return {
        ...state,
        status: action.payload.status,
        msg: action.payload.msg,
        id: action.payload.id
      };
    case User_Auth_Success:
      return {};
    default:
      return state;
  }
};
