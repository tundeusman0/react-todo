import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { register } from '../actions/auth';

const Register = ({ register, history }) => (
  <div>
    <Form
      formName="Register"
      history={history}
      submitForm={user => register(user)}
    />
  </div>
);

export default connect(
  null,
  { register }
)(Register);
