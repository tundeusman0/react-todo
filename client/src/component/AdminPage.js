import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminGet, adminDeleteUser } from '../actions/admin';

export class AdminPage extends React.Component {
  state = {
    isLoading: true
  };
  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;
    if (prevProps.isLoading !== isLoading) {
      this.setState({ isLoading: false });
    }
  }
  componentDidMount() {
    this.props.adminGet();
  }
  render() {
    return (
      <div>
        <h1>Admin Area</h1>
        {this.state.isLoading ? (
          <h1>Loading Users....</h1>
        ) : (
          <div>
            {this.props.users.length === 0 && (
              <h2>You Have No Registered Users</h2>
            )}
            {this.props.users &&
              this.props.users.map(user => (
                <div key={user._id}>
                  <li>{user.name}</li>
                  <button onClick={() => this.props.adminDeleteUser(user._id)}>
                    Delete {user.name}
                  </button>
                </div>
              ))}
          </div>
        )}

        <Link to="/">Go Back</Link>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users: state.admin.users,
  isLoading: state.admin.isLoading
});
export default connect(
  mapStateToProps,
  { adminGet, adminDeleteUser }
)(AdminPage);
