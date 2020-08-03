import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withCookies } from 'react-cookie';
import reduxStore from './store/store';

import Header from './shared/Header/Header';
import Footer from './shared/Footer/Footer';
import Login from './components/auth/Login/Login';
import Signup from './components/auth/Signup/Signup';
import Overview from './components/overview/Overview';
import Tour from './components/Tour/Tour';
import Account from './components/Account/Account';
import Alert from './shared/Alert/Alert';
import ResetPassword from './components/auth/ResetPassword/ResetPassword';
import ForgetPassword from './components/auth/ForgetPassword/ForgetPassword';

import PrivateRoute from './routing';

require('dotenv').config();

const App = (props) => {
   return (
      <Provider store={reduxStore}>
         <BrowserRouter>
            <Alert />
            <Header cookies={props.cookies} />
            <Route exact path="/" render={() => <Overview />} />
            <Route path="/tour/:slug" component={Tour} />
            <Route
               path="/login"
               render={() => <Login cookies={props.cookies} />}
            />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/me" component={Account} />
            <PrivateRoute path="/resetPassword" component={ResetPassword} />
            <PrivateRoute path="/forgetPassword" component={ForgetPassword} />
            <Footer />
         </BrowserRouter>
      </Provider>
   );
};

export default withCookies(App);
