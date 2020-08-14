import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const privateRoute = ({
   component: Component,
   auth: { isAuthenticated, loading },
   ...rest
}) => (
   <Route
      {...rest}
      render={(props) =>
         !isAuthenticated && !loading ? (
            <Redirect to="/login" />
         ) : (
            <Component {...props} />
         )
      }
   />
);

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export const PrivateRoute = connect(mapStateToProps)(privateRoute);

const restrictedRoute = ({ component: Component, user, ...rest }) => (
   <Route
      {...rest}
      render={(props) => {
         if (!(user.role === 'admin' || user.role === 'lead-guide')) {
            return <Redirect to="/login" />;
         } else {
            return <Component {...props} />;
         }
      }}
   />
);
const mapStateToProps2 = (state) => ({
   auth: state.auth,
   user: state.profile.users,
});
export const RestrictedRoute = connect(mapStateToProps2)(restrictedRoute);
