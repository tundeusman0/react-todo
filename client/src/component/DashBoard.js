import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { connect } from 'react-redux';

// import PropTypes from 'prop-types'

const DashBoard = ({ history, logoutUser }) => {
  return (
    <div>
      <button
        onClick={() => {
            logoutUser();
            history.push('/');
          }
        }
      >
        LogOut
      </button>
      <Link to="/add-todo">Add Todo</Link>
      <Link to="/edit-todo">Edit Todo</Link>
      <Link to="/delete-todo">Delete Todo</Link>
    </div>
  );
};

// DashBoard.propTypes = {

// }

export default connect(
  null,
  { logoutUser }
)(DashBoard);
