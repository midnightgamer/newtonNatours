import React, { useEffect } from 'react';
import { BrowserRouter, Route, Priv } from 'react-router-dom';
import { Provider } from 'react-redux';
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

import { loadTours } from './store/action/tours';
import PrivateRoute from './routing';

const App = () => {
   useEffect(() => {
      reduxStore.dispatch(loadTours());
   }, []);
   return (
      <Provider store={reduxStore}>
         <BrowserRouter>
            <Alert />
            <Header />
            <Route exact path="/" component={Overview} />
            <Route path="/tour/:slug" component={Tour} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/me" component={Account} />
            <PrivateRoute path="/resetPassword" component={ResetPassword} />
            <PrivateRoute path="/forgetPassword" component={ForgetPassword} />
            <Footer />
         </BrowserRouter>
      </Provider>
   );
};

export default App;
