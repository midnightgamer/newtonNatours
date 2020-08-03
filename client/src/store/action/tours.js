import { LOAD_SINGLE_TOUR, LOAD_TOURS } from './types';
import axiosInstance from '../../axiosInstance';

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

export const setSingleTour = (slug) => async (dispatch) => {
   try {
      const tour = await axiosInstance.get(`/tours/${slug}`, {
         withCredentials: true,
      });
      dispatch({
         type: LOAD_SINGLE_TOUR,
         payload: tour.data.data.tour,
      });
   } catch (e) {
      console.log(e);
   }
};

export const clearSingleTour = () => async (dispatch) => {};
