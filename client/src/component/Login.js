import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { login } from '../actions/auth';

const Login = ({ login, history }) => {
  return (
    <div>
      <Form
        formName="Login"
        history={history}
        submitForm={user => login(user)}
      />
    </div>
  );
};

export default connect(
  null,
  { login }
)(Login);
