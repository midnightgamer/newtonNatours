import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
import BookedTours from './components/BookedTours/BookedTours';

import { loadCurrentUser } from './store/action/profile';

import PrivateRoute from './routing';
import { loadBookedTours, loadTours } from './store/action/tours';
import Reviews from './components/Account/Reviews/Reviews';

require('dotenv').config();

const App = (props) => {
   useEffect(() => {
      let user = null;
      (async () => {
         user = await fetchUser();
         if (user) {
            reduxStore.dispatch(loadBookedTours(user));
         }
      })();
      reduxStore.dispatch(loadTours());
   }, []);
   const fetchUser = () => {
      const user = reduxStore.dispatch(loadCurrentUser());
      return user;
   };
   return (
      <Provider store={reduxStore}>
         <BrowserRouter>
            <Alert />
            <Header />
            <Route exact path="/" render={() => <Overview />} />
            <Route exact path="/tour/:slug" component={Tour} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/signup" component={Signup} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/forgetPassword" component={ForgetPassword} />
            <PrivateRoute path="/my-bookings" component={BookedTours} />
            <PrivateRoute path="/reviews" component={Reviews} />
            <PrivateRoute path="/me" component={Account} />
            <Footer />
         </BrowserRouter>
      </Provider>
   );
};

export default App;
