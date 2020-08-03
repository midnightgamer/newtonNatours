import { USER_LOAD_FAIL, USER_LOADED, USER_UPDATED } from './types';
import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';
import axios from 'axios';

export const loadCurrentUser = () => async (dispatch) => {
   try {
      const user = await axiosInstance.get('/users/me');
      dispatch({
         type: USER_LOADED,
         payload: user.data.data.data,
      });
   } catch (e) {
      dispatch({ type: USER_LOAD_FAIL });
   }
};

export const updateUser = (body, type) => async (dispatch) => {
   console.log(type);
   try {
      const url =
         type === 'password' ? '/auth/changePassword' : '/users/updateMe';
      const res = await axiosInstance({
         method: 'PATCH',
         url: url,
         body,
      });
      dispatch({
         type: USER_UPDATED,
         payload: res.data.data.user,
      });
      if (type === 'password') {
         dispatch(setAlert('success', 'Password updated'));
      } else {
         dispatch(setAlert('success', 'Profile updated'));
      }
   } catch (e) {
      dispatch(setAlert('error', e));
   }
};
