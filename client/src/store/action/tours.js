import {
   CLEAR_SINGLE_TOUR,
   GET_BOOKED_TOURS_FAIL,
   GET_BOOKED_TOURS_INIT,
   GET_BOOKED_TOURS_SUCCESS,
   LOAD_SINGLE_TOUR_FAIL,
   LOAD_SINGLE_TOUR_INIT,
   LOAD_SINGLE_TOUR_SUCCESS,
   LOAD_TOURS_FAIL,
   LOAD_TOURS_INIT,
   LOAD_TOURS_SUCCESS,
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
