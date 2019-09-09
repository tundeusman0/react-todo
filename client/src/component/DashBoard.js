import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
  <HelmetProvider>
    <div>
      <Helmet>
        <title>{userName} React Todo app</title>
        <meta name="description" content="A React Todo authentication App" />
        <meta
          name="keywords"
          content="The react app that helps you manage your Todo list"
        />
      </Helmet>
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
  </HelmetProvider>
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
