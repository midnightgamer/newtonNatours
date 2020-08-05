import React, { useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../../store/action/auth';
import Buttons from '../../../shared/Buttons/Buttons';
import { Redirect } from 'react-router-dom';

const Signup = ({ registerUser, isAuthenticated, history }) => {
   console.log(history);
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
   });
   const { email, password, name, passwordConfirm } = formData;
   const onChange = (e) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value,
      });
   };
   const onSubmit = (e) => {
      e.preventDefault();
      registerUser({
         name,
         email,
         password,
         passwordConfirm,
      });
   };
   let singup;
   if (isAuthenticated) {
      singup = <Redirect to={'/'} />;
   } else {
      singup = (
         <main className="main">
            <div className="login-form">
               <h2 className="heading-secondary ma-bt-lg">
                  CREATE YOUR ACCOUNT!
               </h2>
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
                        onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChange(e)}
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
                     <Buttons onClick={(e) => onSubmit(e)}>Sing up</Buttons>
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
   }

   return singup;
};
const mapStatesToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStatesToProps, { registerUser })(Signup);
