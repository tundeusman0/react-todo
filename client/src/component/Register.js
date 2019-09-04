import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { addUser } from '../actions/auth';

const Register = ({ addUser, history }) => (
  <div>
    <Form
      formName="Register"
      history={history}
      submitForm={user => addUser(user)}
    />
  </div>
);

export default connect(
  null,
  { addUser }
)(Register);
