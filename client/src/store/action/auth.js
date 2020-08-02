import { LOGIN_FAIL, LOGIN_SUCCESS } from './types';
import axios from '../../axiosInstance';
import { setAlert } from './alert';
import { loadUser } from './profile';
//Login User
export const loginUser = (email, password) => async (dispatch) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   };

   const body = JSON.stringify({
      email,
      password,
   });
   try {
      const res = await axios.post('/auth/login', body, config);
      dispatch({
         type: LOGIN_SUCCESS,
      });
      dispatch(loadUser(res.data));
      dispatch(setAlert('success', res.data.status));
   } catch (e) {
      dispatch({
         type: LOGIN_FAIL,
      });
      dispatch(setAlert('error', e.response.data.message));
   }
};
