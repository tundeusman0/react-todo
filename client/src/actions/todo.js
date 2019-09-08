import axios from 'axios';
import userTokenConfig from '../selectors/userTokenConfig';
import {
  Get_Todo,
  Get_Todo_Fail,
  Todo_Success,
  Add_Todo,
  Add_Todo_Fail,
  Edit_Todo,
  Delete_Todo,
  Todo_Loading
} from './types';

export const returnTodoError = payload => ({
  type: Get_Todo_Fail,
  payload
});

export const getTodo = () => async (dispatch, getState) => {
  dispatch(setTodoLoading());
  try {
    const res = await axios.get('/api/todo', userTokenConfig(getState));
    dispatch({ type: Get_Todo, payload: res.data });
    dispatch({ type: Todo_Success });
  } catch (error) {
    let msg = '',
      status = '';
    if (error.message === 'Request failed with status code 400') {
      msg = 'Unable to Get Todo';
      status = '400';
    } else {
      msg = `Unable to Get Todo`;
      status = '500';
    }
    dispatch(returnTodoError({ status, msg }));
  }
};

export const addTodo = (payload = {}) => async (dispatch, getState) => {
  try {
    let { completed } = payload;
    completed = JSON.parse(completed);
    const body = { ...payload, completed };
    const res = await axios.post('/api/todo', body, userTokenConfig(getState));
    dispatch({ type: Add_Todo, payload: res.data.todo });
    dispatch({ type: Todo_Success });
  } catch (error) {
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
  try {
    await axios.patch(
      `/api/todo/${payload.id}`,
      payload.todo,
      userTokenConfig(getState)
    );
    dispatch({ type: Edit_Todo, payload });
    dispatch({ type: Todo_Success });
  } catch (error) {
    let msg = '',
      status = '';
    if (error.message === 'Request failed with status code 406') {
      msg = 'Fill all Fields';
      status = '406';
    } else {
      msg = `Unable to Post Todo`;
      status = '400';
    }
    dispatch({ type: Add_Todo_Fail });
    dispatch(returnTodoError({ status, msg, id: 'TODO_EDIT_FAIL' }));
  }
};

export const deleteTodo = id => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/todo/${id}`, userTokenConfig(getState));
    dispatch({ type: Delete_Todo, id });
  } catch (error) {
    dispatch({ type: Add_Todo_Fail });
  }
};

export const setTodoLoading = () => ({
  type: Todo_Loading
});
