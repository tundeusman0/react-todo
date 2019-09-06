import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminGet } from '../actions/admin';

export class AdminPage extends React.Component {
  componentDidMount() {
    this.props.adminGet();
  }
  render() {
    return (
      <div>
        <h1>Admin Area</h1>
        {this.props.users !== undefined &&
          this.props.users.map(user => (
            <div key={user._id}>
              <li>{user.name}</li>
            </div>
          ))}
        <Link to="/">Go Back</Link>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users: state.admin.users
});
export default connect(
  mapStateToProps,
  { adminGet }
)(AdminPage);
