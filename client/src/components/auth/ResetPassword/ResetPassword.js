import React from 'react';
import './ResetPassword.css';
import Buttons from '../../../shared/Buttons/Buttons';

const ResetPassword = (props) => (
   <main className="main">
      <div className="login-form">
         <h2 className="heading-secondary ma-bt-lg">Reset your password</h2>
         <form className="form">
            <div className="form__group">
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
            <div className="form__group ma-bt-md">
               <label className="form__label" htmlFor="confirmPassword">
                  Confirm Password
               </label>
               <input
                  className="form__input"
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required="required"
                  minLength="8"
               />
            </div>
            <div className="form__group">
               <Buttons to={'/me'}>Reset Password</Buttons>
            </div>
         </form>
      </div>
   </main>
);

export default ResetPassword;
