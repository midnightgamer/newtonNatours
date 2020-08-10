import {
   USER_LOAD_FAIL,
   USER_LOAD_INIT,
   USER_LOAD_SUCCESS,
   USER_UPDATE_FAIL,
   USER_UPDATE_INIT,
   USER_UPDATE_SUCCESS,
} from './types';
import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';

export const loadCurrentUser = () => async (dispatch) => {
   try {
      dispatch({ type: USER_LOAD_INIT });
      const user = await axiosInstance.get('/users/me');
      dispatch({
         type: USER_LOAD_SUCCESS,
         payload: user.data.data.data,
      });
      return user.data.data.data._id;
   } catch (e) {
      dispatch({ type: USER_LOAD_FAIL });
   }
};

export const updateUser = (data, type) => async (dispatch) => {
   try {
      dispatch({ type: USER_UPDATE_INIT });
      const url =
         type === 'password' ? '/auth/changePassword' : '/users/updateMe';
      const res = await axiosInstance({
         method: 'PATCH',
         url: url,
         data,
      });
      dispatch({
         type: USER_UPDATE_SUCCESS,
         payload: res.data.data.user,
      });
      if (type === 'password') {
         dispatch(setAlert('success', 'Password updated'));
      } else {
         dispatch(setAlert('success', 'Profile updated'));
      }
   } catch (e) {
      dispatch({ type: USER_UPDATE_FAIL });
      dispatch(setAlert('error', e.response.data.message));
   }
};
