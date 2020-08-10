//Add new Review to tour
import axiosInstance from '../../axiosInstance';
import {
   ADD_REVIEW_FAIL,
   ADD_REVIEW_INIT,
   ADD_REVIEW_SUCCESS,
   DELETE_REVIEW_FAIL,
   DELETE_REVIEW_INIT,
   DELETE_REVIEW_SUCCESS,
   GET_ALL_REVIEW_FAIL,
   GET_ALL_REVIEW_INIT,
   GET_ALL_REVIEW_SUCCESS,
   UPDATE_REVIEW_FAIL,
   UPDATE_REVIEW_INIT,
   UPDATE_REVIEW_SUCCESS,
} from './types';
import { setAlert } from './alert';

export const getAllReviewByUser = () => async (dispatch) => {
   try {
      dispatch({ type: GET_ALL_REVIEW_INIT });
      const res = await axiosInstance.get('/users/reviews');
      dispatch({ type: GET_ALL_REVIEW_SUCCESS, payload: res.data.data.data });
   } catch (e) {
      console.log(e);
      dispatch({ type: GET_ALL_REVIEW_FAIL });
      dispatch(setAlert('error', e.response.data.message));
   }
};
export const addNewReview = (data) => async (dispatch) => {
   try {
      dispatch({ type: ADD_REVIEW_INIT });
      const res = await axiosInstance.post('/reviews', { ...data });
      dispatch({
         type: ADD_REVIEW_SUCCESS,
         payload: res.data.data.data,
      });
      dispatch(setAlert('success', 'Review Added'));
   } catch (e) {
      console.log(e);
      dispatch({ type: ADD_REVIEW_FAIL });
      dispatch(setAlert('error', e));
   }
};

export const updateReview = (data, id) => async (dispatch) => {
   try {
      dispatch({ type: UPDATE_REVIEW_INIT });
      const res = await axiosInstance.patch(`/reviews/${id}`, { ...data });
      dispatch({
         type: UPDATE_REVIEW_SUCCESS,
         payload: {
            id,
            res: res.data.data.data,
         },
      });
      dispatch(setAlert('success', 'Review Updated'));
   } catch (e) {
      console.log(e);
      dispatch({ types: UPDATE_REVIEW_FAIL });
      dispatch(setAlert('error', e));
   }
};

export const deleteReview = (id) => async (dispatch) => {
   try {
      dispatch({ type: DELETE_REVIEW_INIT });
      await axiosInstance.delete(`/reviews/${id}`);
      dispatch({
         type: DELETE_REVIEW_SUCCESS,
         payload: id,
      });
      dispatch(setAlert('success', 'Review Deleted'));
   } catch (e) {
      console.log(e);
      dispatch({ type: DELETE_REVIEW_FAIL });
      dispatch(setAlert('error', e));
   }
};
