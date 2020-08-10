import {
   CLEAR_SINGLE_TOUR,
   GET_BOOKED_TOURS,
   LOAD_SINGLE_TOUR,
   LOAD_TOURS,
} from './types';
import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';

//Load All tours
export const loadTours = () => async (dispatch) => {
   try {
      const tours = await axiosInstance.get('/tours', {
         withCredentials: true,
      });
      dispatch({
         type: LOAD_TOURS,
         payload: tours.data.data.data,
      });
   } catch (e) {
      console.log(e);
   }
};

//Load tours booked by logged in user
export const loadBookedTours = (userId) => async (dispatch) => {
   try {
      const bookedTours = await axiosInstance.get(
         `/bookings/my-bookings/${userId}`
      );
      dispatch({
         type: GET_BOOKED_TOURS,
         payload: bookedTours.data.data.data,
      });
   } catch (e) {
      setAlert('error', e.response.data.message);
   }
};

//Load single tour that is being clicked
export const setSingleTour = (slug) => async (dispatch) => {
   try {
      dispatch({ type: CLEAR_SINGLE_TOUR });
      const tour = await axiosInstance.get(`/tours/${slug}`);
      dispatch({
         type: LOAD_SINGLE_TOUR,
         payload: tour.data.data.tour,
      });
   } catch (e) {
      console.log(e);
   }
};
