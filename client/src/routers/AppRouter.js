import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import DashBoard from '../component/DashBoard';
import HomePage from '../component/HomePage';
import Register from '../component/Register';
import Login from '../component/Login';
import AddTodos from '../component/AddTodos';
import EditTodos from '../component/EditTodos';
import EditUser from '../component/EditUser';
import AdminPage from '../component/AdminPage';
import NoMatch from '../component/NoMatch';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoadingPage from '../component/LoadingPage';
import Footer from '../component/Footer';

const history = createBrowserHistory();

export class AppRouter extends Component {
  state = {
    isLoading: true
  };
  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;
    if (isLoading !== prevProps.isLoading) {
      if (this.state.isLoading !== isLoading) {
        this.setState({ isLoading: false });
      }
    }
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <LoadingPage />
        ) : (
          <Router history={history}>
            <div className="page-body">
              <Switch>
                <PublicRoute exact path="/" component={HomePage} />
                <PublicRoute path="/register" component={Register} />
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path="/add-todo" component={AddTodos} />
                <PrivateRoute path="/dashboard" component={DashBoard} />
                <PrivateRoute path="/edit-todo/:id" component={EditTodos} />
                <PrivateRoute path="/admin" component={AdminPage} />
                <PrivateRoute path="/edit-user/:id" component={EditUser} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Router>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading
});
export default connect(mapStateToProps)(AppRouter);
