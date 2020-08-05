import React, { useState } from 'react';
import './ForgetPassword.css';
import { connect } from 'react-redux';
import { forgetPassword } from '../../../store/action/auth';
import { Redirect } from 'react-router-dom';

const ForgetPassword = ({ isAuthenticated, forgetPassword }) => {
   const [eamil, setEmail] = useState('');
   const onSubmit = (e) => {
      e.preventDefault();
      forgetPassword(eamil);
   };
   let forgetPasswordUI = null;
   if (isAuthenticated) {
      forgetPasswordUI = <Redirect to={'/'} />;
   } else {
      forgetPasswordUI = (
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
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>
                  <div className="form__group">
                     <button
                        className="btn btn--green"
                        onClick={(e) => onSubmit(e)}
                     >
                        Send Mail
                     </button>
                  </div>
               </form>
            </div>
         </main>
      );
   }
   return forgetPasswordUI;
};
const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { forgetPassword })(ForgetPassword);
