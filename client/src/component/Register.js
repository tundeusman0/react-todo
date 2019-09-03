import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { addUser } from '../actions/auth';

const Register = ({ addUser }) => (
  <div>
    <Form
      formName="Register"
      submitForm={user => {
        addUser(user);
      }}
    />
  </div>
);

export default connect(
  null,
  { addUser }
)(Register);
