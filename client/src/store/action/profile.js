import { USER_LOADED, USER_UPDATED } from './types';
import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';

export const loadUser = (user) => (dispatch) => {
   dispatch({
      type: USER_LOADED,
      payload: user,
   });
};

export const updateUser = (body) => async (dispatch) => {
   try {
      const res = await axiosInstance.patch('/users/updateMe', body);
      console.log(res);
      dispatch({
         type: USER_UPDATED,
         payload: res.data,
      });
      dispatch(setAlert('success', 'Profile updated'));
   } catch (e) {
      dispatch(setAlert('error', e));
   }
};
