import { USER_LOAD_FAIL, USER_LOADED, USER_UPDATED } from './types';
import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';

export const loadCurrentUser = () => async (dispatch) => {
   try {
      const user = await axiosInstance.get('/users/me');
      console.log(user);
      dispatch({
         type: USER_LOADED,
         payload: user.data.data.data,
      });
   } catch (e) {
      dispatch({ type: USER_LOAD_FAIL });
   }
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
