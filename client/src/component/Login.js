import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { loginUser } from '../actions/auth';

const Login = ({ loginUser, history }) => {
  return (
    <div>
      <Form
        formName="Login"
        history={history}
        submitForm={user => loginUser(user)}
      />
    </div>
  );
};

export default connect(
  null,
  { loginUser }
)(Login);
