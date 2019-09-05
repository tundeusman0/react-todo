import {
  Get_Todo,
  Add_Todo,
  Add_Todo_Fail,
  Edit_Todo,
  Delete_Todo
} from '../actions/types';

const inistialState = {
  todos: [],
  isLoading: false
};

export default (state = inistialState, action) => {
  switch (action.type) {
    case Get_Todo:
      return { ...state, todos: action.payload };
    case Add_Todo:
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };
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
      console.log(state.todos);
      return state.todos.filter(todo => todo._id !== action.id);
    case Add_Todo_Fail:
      return [];
    default:
      return state;
  }
};
