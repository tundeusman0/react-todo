import { Get_Todo_Fail, Todo_Success } from '../actions/types';

const inistialState = {
  status: null,
  msg: null,
  id: null
};

export default (state = inistialState, action) => {
  switch (action.type) {
    case Get_Todo_Fail:
      return {
        ...state,
        status: action.payload.status,
        msg: action.payload.msg,
        id: action.payload.id
      };
    case Todo_Success:
      return {};
    default:
      return state;
  }
};
