import {
  Get_Todo,
  Add_Todo,
  Add_Todo_Fail,
  Edit_Todo,
  Delete_Todo
} from '../actions/types';

const inistialState = [];

export default (state = inistialState, action) => {
  switch (action.type) {
    case Get_Todo:
    case Add_Todo:
      return [...state, action.payload];
    case Edit_Todo:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            ...action.payload.updates
          };
        } else {
          return todo;
        }
      });
    case Delete_Todo:
      return state.filter(todo => todo.id !== action.payload.id);
    case Add_Todo_Fail:
      return [];
    default:
      return state;
  }
};
