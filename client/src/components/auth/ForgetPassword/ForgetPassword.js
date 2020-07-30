import React from 'react';
import './ForgetPassword.css';
import Buttons from '../../../shared/Buttons/Buttons';

const ForgetPassword = (props) => (
   <main className="main">
      <div className="login-form">
         <h2 className="heading-secondary ma-bt-lg">Forget Password</h2>
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
            <div className="form__group">
               <Buttons to="/to">Send Mail</Buttons>
            </div>
         </form>
      </div>
   </main>
);

export default ForgetPassword;
