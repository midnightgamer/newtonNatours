import { LOAD_SINGLE_TOUR, LOAD_TOURS, SET_ALERT } from './types';
import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';
import axios from '../../axiosInstance';

export const loadTours = () => async (dispatch) => {
   try {
      const tour = await axiosInstance.get('/tours');
      dispatch({
         type: LOAD_TOURS,
         payload: tour.data.data.data,
      });
   } catch (e) {
      console.log(e);
   }
};

export const setSingleTour = (id) => async (dispatch) => {
   dispatch({
      type: LOAD_SINGLE_TOUR,
      payload: id,
   });
};

export const clearSingleTour = () => async (dispatch) => {};
