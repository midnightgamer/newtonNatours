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

import { loadTours } from './store/action/tours';

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
            <Route path="/tour/tour-name" component={Tour} />
            <Route path="/me" component={Account} />
            <Route path="/login" component={Login} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/forgetPassword" component={ForgetPassword} />
            <Route path="/signup" component={Signup} />
            <Footer />
         </BrowserRouter>
      </Provider>
   );
};

export default App;
