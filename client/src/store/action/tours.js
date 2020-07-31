import { LOAD_TOURS, SET_ALERT } from './types';
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
