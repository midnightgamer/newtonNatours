import React from 'react';
import './Login.css';
import Buttons from '../../../shared/Buttons/Buttons';

const Login = (props) => (
   <main className="main">
      <div className="login-form">
         <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
         <form className="form">
            <div className="form__group">
               <label className="form__label" htmlFor="email">
                  Email address
               </label>
               <input
                  className="form__input"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required="required"
               />
            </div>
            <div className="form__group ma-bt-md">
               <label className="form__label" htmlFor="password">
                  Password
               </label>
               <input
                  className="form__input"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required="required"
                  minLength="8"
               />
            </div>
            <div className="form__group">
               <Buttons to={'/'}>Login</Buttons>
            </div>
            <div className="form__group ">
               <Buttons to={'/resetPassword'} type={'text'}>
                  Forget password ? Reset
               </Buttons>
               <Buttons to={'/signup'} type={'text'}>
                  Don't have account ? Create a new account
               </Buttons>
            </div>
         </form>
      </div>
   </main>
);

export default Login;
