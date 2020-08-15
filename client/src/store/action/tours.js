import {
   CLEAR_SINGLE_TOUR,
   CREATE_TOUR_FAIL,
   CREATE_TOUR_INIT,
   CREATE_TOUR_SUCCESS,
   DELETE_TOUR_FAIL,
   DELETE_TOUR_INIT,
   DELETE_TOUR_SUCCESS,
   GET_BOOKED_TOURS_FAIL,
   GET_BOOKED_TOURS_INIT,
   GET_BOOKED_TOURS_SUCCESS,
   LOAD_SINGLE_TOUR_FAIL,
   LOAD_SINGLE_TOUR_INIT,
   LOAD_SINGLE_TOUR_SUCCESS,
   LOAD_TOURS_FAIL,
   LOAD_TOURS_INIT,
   LOAD_TOURS_SUCCESS,
   UPDATE_TOUR_FAIL,
   UPDATE_TOUR_IMAGES_FAIL,
   UPDATE_TOUR_IMAGES_SUCCESS,
   UPDATE_TOUR_INIT,
   UPDATE_TOUR_SUCCESS,
} from './types';
import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';

//Load All tours
export const loadTours = () => async (dispatch) => {
   try {
      dispatch({ type: LOAD_TOURS_INIT });
      const tours = await axiosInstance.get('/tours', {
         withCredentials: true,
      });
      dispatch({
         type: LOAD_TOURS_SUCCESS,
         payload: tours.data.data.data,
      });
   } catch (e) {
      console.log(e);
      dispatch(setAlert('error', e.response.data.message));
      dispatch({ type: LOAD_TOURS_FAIL });
   }
};

//Load tours booked by logged in user
export const loadBookedTours = (userId) => async (dispatch) => {
   try {
      dispatch({ type: GET_BOOKED_TOURS_INIT });
      const bookedTours = await axiosInstance.get(
         `/bookings/my-bookings/${userId}`
      );
      dispatch({
         type: GET_BOOKED_TOURS_SUCCESS,
         payload: bookedTours.data.data.data,
      });
   } catch (e) {
      dispatch(setAlert('error', e.response.data.message));
      dispatch({ type: GET_BOOKED_TOURS_FAIL });
   }
};

//Load single tour that is being clicked
export const setSingleTour = (slug) => async (dispatch) => {
   try {
      dispatch({ type: LOAD_SINGLE_TOUR_INIT });
      dispatch({ type: CLEAR_SINGLE_TOUR });
      const tour = await axiosInstance.get(`/tours/${slug}`);
      dispatch({
         type: LOAD_SINGLE_TOUR_SUCCESS,
         payload: tour.data.data.tour,
      });
   } catch (e) {
      console.log(e);
      dispatch({ type: LOAD_SINGLE_TOUR_FAIL });
      dispatch(setAlert('error', e.response.data.message));
   }
};

export const updateImages = (id, formData) => async (dispatch) => {
   try {
      dispatch({ type: UPDATE_TOUR_INIT });
      const tour = await axiosInstance.patch(`/tours/${id}`, formData);
      dispatch({
         type: UPDATE_TOUR_IMAGES_SUCCESS,
         payload: tour.data.data.tour,
      });
      dispatch(setAlert('success', 'Tour Images updated'));
   } catch (e) {
      console.log(e);
      dispatch({ type: UPDATE_TOUR_IMAGES_FAIL });
   }
};

export const updateTour = (id, formData, type) => async (dispatch) => {
   try {
      console.log(type);
      if (type !== 'create') {
         dispatch({ type: UPDATE_TOUR_INIT });
         const res = await axiosInstance.patch(`/tours/${id}`, formData);
         dispatch({
            type: UPDATE_TOUR_SUCCESS,
            payload: {
               id,
               res: res.data.data.data,
            },
         });
         dispatch(setAlert('success', 'Tour updated'));
         return res.data.data.data.id;
      } else if (type === 'create') {
         dispatch({ type: CREATE_TOUR_INIT });
         const res = await axiosInstance.post(`/tours`, formData);
         dispatch({
            type: CREATE_TOUR_SUCCESS,
            payload: {
               id,
               res: res.data.data.data,
            },
         });
         dispatch(setAlert('success', 'Tour created'));
         return res.data.data.data.id;
      }
   } catch (e) {
      console.log(e);
      dispatch({ type: CREATE_TOUR_FAIL });
      dispatch(setAlert('error', e.response.data.message));
   }
};

export const deleteTour = (id) => async (dispatch) => {
   try {
      dispatch({ type: DELETE_TOUR_INIT });
      await axiosInstance.delete(`/tours/${id}`);
      dispatch({
         type: DELETE_TOUR_SUCCESS,
         payload: id,
      });
      dispatch(setAlert('success', 'Tour Deleted Successfully'));
   } catch (e) {
      console.log(e);
      dispatch({ type: DELETE_TOUR_FAIL });
      dispatch(setAlert('error', e.response.data.message));
   }
};
