import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types';
import axios from '../../axiosInstance';
import { setAlert } from './alert';
import { loadCurrentUser } from './profile';
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
      dispatch(loadCurrentUser());
      dispatch(setAlert('success', 'Logged in successfully'));
   } catch (e) {
      setAlert('error', e.response.data.message);
      dispatch({
         type: LOGIN_FAIL,
      });
   }
};
export const logoutUser = () => async (dispatch) => {
   try {
      await axios.get('/auth/logout');
      dispatch({ type: LOGOUT });
      setAlert('success', 'Logout Successfully');
   } catch (e) {
      setAlert('error', e.response.data.message);
   }
};
