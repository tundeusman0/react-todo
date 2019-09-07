import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { editUser } from '../actions/auth';

export const EditUser = ({ user, editUser, userId, history }) => (
  <div>
    <Form
      user={user}
      formName="Edit User"
      history={history}
      submitForm={updates => editUser({ id: userId, updates })}
    />
  </div>
);

const mapStateToProps = (state, { match }) => ({
  user: state.auth.user.user._id === match.params.id && state.auth.user.user,
  userId: match.params.id
});
export default connect(
  mapStateToProps,
  { editUser }
)(EditUser);
