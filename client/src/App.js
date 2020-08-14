import React, { useEffect } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
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

import { PrivateRoute, RestrictedRoute } from './routing';
import { loadBookedTours, loadTours } from './store/action/tours';
import Reviews from './components/Account/Reviews/Reviews';
import NotFound from './shared/404/404';
import EditTour from './components/Tour/EditTour/EditTour';
import CreateTour from './components/Tour/CreateTour/CreateTour';

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
            <Switch>
               <Route exact path="/" render={() => <Overview />} />
               <RestrictedRoute
                  exact
                  path="/tour/createTour"
                  component={CreateTour}
               />
               <Route exact path="/tour/:slug" component={Tour} />
               <Route exact path="/login" render={() => <Login />} />
               <Route exact path="/signup" component={Signup} />
               <Route
                  exact
                  path="/resetPassword/:token"
                  component={ResetPassword}
               />
               <Route exact path="/forgetPassword" component={ForgetPassword} />
               <RestrictedRoute
                  exact
                  path="/tour/:slug/editTour"
                  component={EditTour}
               />
               <PrivateRoute path="/my-bookings" component={BookedTours} />
               <PrivateRoute path="/reviews" component={Reviews} />
               <PrivateRoute path="/me" component={Account} />
               <Route path="*" component={NotFound} />
            </Switch>
            <Footer />
         </BrowserRouter>
      </Provider>
   );
};

export default App;
