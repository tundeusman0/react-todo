import React from 'react';
import TodosForm from './TodosForm';
import { connect } from 'react-redux';
import { editTodo } from '../actions/todo';

const EditTodos = ({ todo, editTodo, match, history }) => (
  <div>
    <TodosForm
      formName="Edit Todo"
      todo={todo}
      history={history}
      submitForm={todo => editTodo({ id: match.params.id, todo })}
    />
  </div>
);

const mapStateToProps = (state, props) => ({
  todo: state.todos.todos.find(todo => todo._id === props.match.params.id)
});
export default connect(
  mapStateToProps,
  { editTodo }
)(EditTodos);
