import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../store/action/auth';
import './Login.css';
import { Redirect } from 'react-router-dom';
import Buttons from '../../../shared/Buttons/Buttons';

const Login = (props) => {
   const { isAuthenticated, loginUser, isLoading } = props;
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });
   useEffect(() => {
      document.title = `Natours | Log into your account `;
   }, []);
   const { email, password } = formData;
   let login = (
      <main className="main">
         <div className="login-form">
            <h2 className="heading-secondary ma-bt-lg">
               Log into your account
            </h2>
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
                     onChange={(e) => onChange(e)}
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
                     onChange={(e) => onChange(e)}
                     type="password"
                     placeholder="••••••••"
                     required="required"
                     minLength="8"
                  />
               </div>
               <div className="form__group">
                  <Buttons
                     to={'/login'}
                     isLoading={isLoading}
                     onClick={(e) => onSubmit(e)}
                  >
                     Login
                  </Buttons>
               </div>
               <div className="form__group ">
                  <Buttons to={'/forgetPassword'} type={'text'}>
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
   if (isAuthenticated) {
      login = <Redirect to={'/'} />;
   }

   const onChange = (e) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value,
      });
   };
   const onSubmit = (e) => {
      e.preventDefault();
      loginUser(email, password);
   };

   return login;
};
const mapStateToProps = (state, ownProps) => ({
   isAuthenticated: state.auth.isAuthenticated,
   isLoading: state.auth.isLoading,
   cookies: ownProps.cookies,
});
export default connect(mapStateToProps, {
   loginUser,
})(Login);
