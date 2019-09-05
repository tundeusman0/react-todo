import React from 'react';
import { connect } from 'react-redux';
import TodosForm from './TodosForm';
import { addTodo } from '../actions/todo';

export const AddTodos = ({ addTodo, history }) => (
  <div>
    <TodosForm
      formName="Add Todo"
      history={history}
      submitForm={todo => {
        addTodo(todo);
      }}
    />
  </div>
);

export default connect(
  null,
  { addTodo }
)(AddTodos);
