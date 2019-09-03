import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import Todo from './TodosForm';
import { loginUser } from '../actions/auth';

const Login = ({ loginUser }) => {
  return (
    <div>
      <Form formName="Login" submitForm={user => loginUser(user)} />
      <Todo />
    </div>
  );
};

export default connect(
  null,
  { loginUser }
)(Login);
