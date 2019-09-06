import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, deleteSelf } from '../actions/auth';
import Todo from './Todo';

// import PropTypes from 'prop-types'

class DashBoard extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello {this.props.userName}</h1>
        <button
          onClick={() => {
            this.props.logoutUser();
            this.props.history.push('/');
          }}
        >
          LogOut
        </button>
        <button onClick={() => this.props.deleteSelf()}>
          Delete Your Account
        </button>
        <Link to="/add-todo">Add Todo</Link>
        <Todo />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.auth.user.user.name
});

export default connect(
  mapStateToProps,
  { logoutUser, deleteSelf }
)(DashBoard);
