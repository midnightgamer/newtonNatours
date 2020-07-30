import React from 'react';
import Buttons from '../../../shared/Buttons/Buttons';

const Signup = (props) => (
   <main className="main">
      <div className="login-form">
         <h2 className="heading-secondary ma-bt-lg">CREATE YOUR ACCOUNT!</h2>
         <form className="form">
            <div className="form__group">
               <label className="form__label" htmlFor="name">
                  Your Name
               </label>
               <input
                  className="form__input"
                  id="name"
                  type="email"
                  placeholder=""
                  required="required"
               />
            </div>
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
            <div className="form__group ma-bt-md">
               <label className="form__label" htmlFor="ConfirmPassword">
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
               <Buttons to={'/me'}>Sing up</Buttons>
            </div>
            <div className="form__group">
               <Buttons to={'/login'} type={'text'}>
                  Already have account ? Login
               </Buttons>
            </div>
         </form>
      </div>
   </main>
);

export default Signup;
