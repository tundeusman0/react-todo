import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import { deleteSelf } from '../actions/user';
import Todo from './Todo';

export const DashBoard = ({
  userName,
  userId,
  isAdmin,
  logout,
  deleteSelf,
  history
}) => (
  <div>
    <h1>Hello {userName}</h1>
    <button
      onClick={() => {
        logout();
        history.push('/');
      }}
    >
      LogOut
    </button>
    <button onClick={() => deleteSelf()}>Delete Your Account</button>
    <Link to={`edit-user/${userId}`}>Edit User</Link>
    <Link to="/add-todo">Add Todo</Link>
    {isAdmin && <Link to="/admin"> Admin Area</Link>}
    <Todo />
  </div>
);

const mapStateToProps = state => ({
  userName: state.auth.user.user.name,
  userId: state.auth.user.user._id,
  isAdmin: state.auth.user.user.isAdmin
});

export default connect(
  mapStateToProps,
  { logout, deleteSelf }
)(DashBoard);
