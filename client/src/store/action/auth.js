import {
   FORGET_PASSWORD_FAIL,
   FORGET_PASSWORD_INIT,
   FORGET_PASSWORD_SUCCESS,
   LOGIN_FAIL,
   LOGIN_INIT,
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_FAIL,
   REGISTER_INIT,
   REGISTER_SUCCESS,
   RESET_PASSWORD_FAIL,
   RESET_PASSWORD_INIT,
   RESET_PASSWORD_SUCCESS,
} from './types';
import axios from '../../axiosInstance';
import { setAlert } from './alert';
import { loadCurrentUser } from './profile';
//Register user
export const registerUser = (body) => async (dispatch) => {
   try {
      dispatch({ type: REGISTER_INIT });
      await axios.post('/auth/signup', body);
      dispatch({ type: REGISTER_SUCCESS });
      dispatch(setAlert('success', 'Account created successfully'));
      dispatch(loadCurrentUser());
   } catch (e) {
      console.log(e);
      dispatch({ type: REGISTER_FAIL });
      dispatch(setAlert('error', e.response.data.message));
   }
};
//Login User
export const loginUser = (email, password) => async (dispatch) => {
   dispatch({ type: LOGIN_INIT });
   const config = {
      headers: {
         'Content-Type': 'application/json',
         withCredentials: true,
      },
   };

   const body = JSON.stringify({
      email,
      password,
   });
   try {
      await axios.post('/auth/login', body, config);
      dispatch({
         type: LOGIN_SUCCESS,
      });
      dispatch(setAlert('success', 'Logged in successfully'));
      dispatch(loadCurrentUser());
   } catch (e) {
      dispatch({
         type: LOGIN_FAIL,
      });
      dispatch(setAlert('error', e.response.data.message));
   }
};
//Logout user
export const logoutUser = () => async (dispatch) => {
   try {
      await axios.get('/auth/logout');
      dispatch({ type: LOGOUT });
      setAlert('success', 'Logout Successfully');
   } catch (e) {
      setAlert('error', e.response.data.message);
   }
};

//ForgetPassword
export const forgetPassword = (body) => async (dispatch) => {
   try {
      dispatch({ type: FORGET_PASSWORD_INIT });
      await axios.post('/auth/forgetPassword', { email: body });
      dispatch({ type: FORGET_PASSWORD_SUCCESS });
      dispatch(setAlert('success', 'Verification link sent to your mail'));
   } catch (e) {
      dispatch(setAlert('error', e.response.data.message));
      dispatch({ type: FORGET_PASSWORD_FAIL });
   }
};

//ResetPassword
export const resetPassword = (props) => async (dispatch) => {
   try {
      dispatch({ type: RESET_PASSWORD_INIT });
      const { path, password, passwordConfirm } = props;
      await axios.patch(`/auth${path}`, {
         password,
         passwordConfirm,
      });
      dispatch({ type: RESET_PASSWORD_SUCCESS });
      dispatch(setAlert('success', 'Password reset successfully'));
   } catch (e) {
      console.log(e);
      dispatch({ type: RESET_PASSWORD_FAIL });
      dispatch(setAlert('error', e.response.data.message));
   }
};
