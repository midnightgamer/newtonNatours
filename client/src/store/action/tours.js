import { LOAD_SINGLE_TOUR, LOAD_TOURS, SET_ALERT } from './types';
import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';

export const loadTours = () => async (dispatch) => {
   try {
      const tours = await axiosInstance.get('/tours');
      dispatch({
         type: LOAD_TOURS,
         payload: tours.data.data.data,
      });
   } catch (e) {
      console.log(e);
   }
};

export const setSingleTour = (slug) => async (dispatch) => {
   try {
      const tour = await axiosInstance.get(`/tours/${slug}`);
      dispatch({
         type: LOAD_SINGLE_TOUR,
         payload: tour.data.data.tour,
      });
   } catch (e) {
      console.log(e);
   }
};

export const clearSingleTour = () => async (dispatch) => {};
