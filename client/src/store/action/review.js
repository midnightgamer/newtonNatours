//Add new Review to tour
import axiosInstance from '../../axiosInstance';
import {
   ADD_REVIEW,
   DELETE_REVIEW,
   GET_ALL_REVIEW,
   UPDATE_REVIEW,
} from './types';
import { setAlert } from './alert';

export const getAllReviewByUser = () => async (dispatch) => {
   try {
      const res = await axiosInstance.get('/users/reviews');
      dispatch({ type: GET_ALL_REVIEW, payload: res.data.data.data });
   } catch (e) {
      console.log(e);
      dispatch(setAlert('error', e.response.data.message));
   }
};
export const addNewReview = (data) => async (dispatch) => {
   try {
      const res = await axiosInstance.post('/reviews', { ...data });
      dispatch({
         type: ADD_REVIEW,
         payload: res.data.data.data,
      });
      dispatch(setAlert('success', 'Review Added'));
   } catch (e) {
      console.log(e);
      dispatch(setAlert('error', e));
   }
};

export const updateReview = (data, id) => async (dispatch) => {
   try {
      const res = await axiosInstance.patch(`/reviews/${id}`, { ...data });
      dispatch({
         type: UPDATE_REVIEW,
         payload: {
            id,
            res: res.data.data.data,
         },
      });
      dispatch(setAlert('success', 'Review Updated'));
   } catch (e) {
      console.log(e);
      dispatch(setAlert('error', e));
   }
};

export const deleteReview = (id) => async (dispatch) => {
   try {
      await axiosInstance.delete(`/reviews/${id}`);
      dispatch({
         type: DELETE_REVIEW,
         payload: id,
      });
      dispatch(setAlert('success', 'Review Deleted'));
   } catch (e) {
      console.log(e);
      dispatch(setAlert('error', e));
   }
};
