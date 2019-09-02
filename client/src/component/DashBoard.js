import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'

const DashBoard = () => {
  return (
    <div>
      <h1>Welcome to My React Todo App</h1>
      <h2>This app is a simple app to create a user and todo lists</h2>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/add-todo">Add Todo</Link>
      <Link to="/edit-todo">Edit Todo</Link>
      <Link to="/delete-todo">Delete Todo</Link>
    </div>
  );
};

// DashBoard.propTypes = {

// }

export default DashBoard;
