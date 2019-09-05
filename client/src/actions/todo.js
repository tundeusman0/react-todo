import axios from 'axios';
import tokenConfig from '../selectors/tokenConfig';
import {
  Get_Todo,
  Get_Todo_Fail,
  Todo_Success,
  Add_Todo,
  Add_Todo_Fail,
  Edit_Todo,
  Delete_Todo
} from './types';

export const returnTodoError = payload => ({
  type: Get_Todo_Fail,
  payload
});

export const getTodo = () => async (dispatch, getState) => {
  //   try {
  //     const res = await axios.get('/api/todo', tokenConfig(getState));
  //     console.log(res.data);
  //     dispatch({ type: Get_Todo, payload: res.data });
  //     dispatch({ type: Todo_Success });
  //   } catch (error) {
  //     let msg = '',
  //       status = '';
  //     if (error.message === 'Request failed with status code 406') {
  //       msg = 'Fill all Fields';
  //       status = '406';
  //     } else {
  //       msg = `Unable to Post Todo`;
  //       status = '400';
  //     }
  //     dispatch({ type: Get_Todo_Fail }, { status, msg });
  //   }
};

export const addTodo = (payload = {}) => async (dispatch, getState) => {
  let { completed } = payload;
  completed = JSON.parse(completed);
  const body = { ...payload, completed };
  try {
    const res = await axios.post('/api/todo', body, tokenConfig(getState));
    dispatch({ type: Add_Todo, payload: res.data });
    dispatch({ type: Todo_Success });
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
    console.log(error);
    let msg = '',
      status = '';
    if (error.message === 'Request failed with status code 406') {
      msg = 'Fill all Fields';
      status = '406';
    } else {
      msg = `Unable to Post Todo`;
      status = '400';
    }
    dispatch(returnTodoError({ status, msg, id: 'TODO_FAIL' }));
  }
};

export const editTodo = payload => async (dispatch, getState) => {
  //   try {
  //     const res = await axios.patch(
  //       `/api/todo/${payload.id}`,
  //       tokenConfig(getState),
  //       payload
  //     );
  //     dispatch({ type: Edit_Todo, payload });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.message);
  //     dispatch({ type: Add_Todo_Fail });
  //   }
};

export const deleteTodo = payload => async (dispatch, getState) => {
  //   try {
  //     const res = await axios.delete(
  //       `/api/todo/${payload.id}`,
  //       tokenConfig(getState)
  //     );
  //     dispatch({ type: Delete_Todo, payload });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.message);
  //     dispatch({ type: Add_Todo_Fail });
  //   }
};
