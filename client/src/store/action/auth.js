import { LOGIN_FAIL, LOGIN_SUCCESS } from './types';
import axios from '../../axiosInstance';
import { setAlert } from './alert';
//Login User
export const loginUser = (email, password) => async (dispatch) => {
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
   } catch (e) {
      console.log(e.response);
      dispatch({
         type: LOGIN_FAIL,
      });
      dispatch(setAlert('error', e.message));
   }
};
export const logoutUser = () => async (dispatch) => {
   try {
      await axios.get('/auth/logout');
   } catch (e) {}
};
