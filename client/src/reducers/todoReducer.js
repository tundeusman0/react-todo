import {
  Get_Todo,
  Add_Todo,
  Add_Todo_Fail,
  Edit_Todo,
  Todo_Loading,
  Todo_Logout,
  Delete_Todo
} from '../actions/types';

const inistialState = {
  todos: [],
  loading: false
};

export default (state = inistialState, action) => {
  switch (action.type) {
    case Get_Todo:
      return { ...state, todos: action.payload, loading: false };
    case Add_Todo:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        loading: false
      };
    case Edit_Todo:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              ...action.payload.todo,
              loading: false
            };
          } else {
            return todo;
          }
        })
      };
    case Delete_Todo:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.id),
        loading: false
      };
    case Add_Todo_Fail:
      return {
        ...state,
        loading: false
      };
    case Todo_Logout:
      return {
        todos: []
      };
    case Todo_Loading:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
