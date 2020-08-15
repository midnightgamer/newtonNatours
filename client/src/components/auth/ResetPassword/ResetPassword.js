import React, { useState } from 'react';
import './ResetPassword.css';
import { connect } from 'react-redux';
import { resetPassword } from '../../../store/action/auth';
import Buttons from '../../../shared/Buttons/Buttons';

const ResetPassword = (props) => {
   const [formData, setFormData] = useState({
      passwordConfirm: '',
      password: '',
   });
   const { resetPassword, history, isLoading } = props;

   const { passwordConfirm, password } = formData;
   const path = history.location.pathname;
   const onChange = (e) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value,
      });
   };
   const onSubmit = (e) => {
      e.preventDefault();
      resetPassword({
         path,
         password,
         passwordConfirm,
      });
   };
   return (
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
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="passwordConfirm">
                     Confirm Password
                  </label>
                  <input
                     className="form__input"
                     id="passwordConfirm"
                     type="password"
                     placeholder="••••••••"
                     required="required"
                     minLength="8"
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <div className="form__group">
                  <Buttons onClick={(e) => onSubmit(e)} isLoading={isLoading}>
                     Reset Password
                  </Buttons>
               </div>
            </form>
         </div>
      </main>
   );
};
const mapStateToProps = (state) => ({
   isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps, { resetPassword })(ResetPassword);
