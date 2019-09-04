import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <div>
          <Redirect to="/" />
        </div>
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.isAthenticated
  //   isAuthenticated: !!state.auth.token
});
// console.log(mapStateToProps().isAuthenticated);
export default connect(mapStateToProps)(PrivateRoute);
