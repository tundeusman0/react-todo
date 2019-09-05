import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import Todo from './Todo';

// import PropTypes from 'prop-types'

class DashBoard extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.logoutUser();
            this.props.history.push('/');
          }}
        >
          LogOut
        </button>
        <Link to="/add-todo">Add Todo</Link>
        <Todo />
      </div>
    );
  }
}

// DashBoard.propTypes = {

// }

export default connect(
  null,
  { logoutUser }
)(DashBoard);
