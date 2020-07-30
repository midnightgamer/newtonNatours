import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './shared/Header/Header';
import Footer from './shared/Footer/Footer';
import Login from './components/auth/Login/Login';
import Signup from './components/auth/Signup/Signup';
import Overview from './components/overview/Overview';
import Tour from './components/Tour/Tour';
import Account from './components/Account/Account';
import ResetPassword from './components/auth/ResetPassword/ResetPassword';
import ForgetPassword from './components/auth/ForgetPassword/ForgetPassword';

const App = () => (
   <BrowserRouter>
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
);

export default App;
