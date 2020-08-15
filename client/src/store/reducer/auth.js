import {
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   REGISTER_FAIL,
   REGISTER_SUCCESS,
   REGISTER_INIT,
   LOGIN_INIT,
   USER_LOAD_INIT,
   USER_LOAD_SUCCESS,
   LOAD_SINGLE_TOUR_INIT,
   GET_BOOKED_TOURS_INIT,
   DELETE_REVIEW_INIT,
   UPDATE_REVIEW_INIT,
   ADD_REVIEW_INIT,
   GET_ALL_REVIEW_INIT,
   LOAD_TOURS_INIT,
   USER_UPDATE_INIT,
   BOOK_TOUR_INIT,
   USER_LOAD_FAIL,
   LOAD_SINGLE_TOUR_FAIL,
   GET_BOOKED_TOURS_FAIL,
   DELETE_REVIEW_FAIL,
   UPDATE_REVIEW_FAIL,
   ADD_REVIEW_FAIL,
   GET_ALL_REVIEW_FAIL,
   LOAD_TOURS_FAIL,
   USER_UPDATE_FAIL,
   BOOK_TOUR_FAIL,
   FORGET_PASSWORD_INIT,
   RESET_PASSWORD_INIT,
   RESET_PASSWORD_FAIL,
   FORGET_PASSWORD_FAIL,
   RESET_PASSWORD_SUCCESS,
   FORGET_PASSWORD_SUCCESS,
   LOAD_SINGLE_TOUR_SUCCESS,
   GET_BOOKED_TOURS_SUCCESS,
   DELETE_REVIEW_SUCCESS,
   BOOK_TOUR_SUCCESS,
   USER_UPDATE_SUCCESS,
   LOAD_TOURS_SUCCESS,
   GET_ALL_REVIEW_SUCCESS,
   ADD_REVIEW_SUCCESS,
   UPDATE_REVIEW_SUCCESS,
   CREATE_TOUR_INIT,
   CREATE_TOUR_SUCCESS,
   CREATE_TOUR_FAIL,
   UPDATE_TOUR_INIT,
   UPDATE_TOUR_SUCCESS,
   UPDATE_TOUR_FAIL,
   DELETE_TOUR_INIT,
   DELETE_TOUR_SUCCESS,
   DELETE_TOUR_FAIL,
} from '../action/types';
import produce from 'immer';

const initialState = {
   isAuthenticated: false,
   isLoading: true,
};

export default produce((draft = initialState, action) => {
   const { type } = action;
   switch (type) {
      case REGISTER_INIT:
      case LOGIN_INIT:
      case USER_LOAD_INIT:
      case LOAD_SINGLE_TOUR_INIT:
      case GET_BOOKED_TOURS_INIT:
      case DELETE_REVIEW_INIT:
      case UPDATE_REVIEW_INIT:
      case ADD_REVIEW_INIT:
      case GET_ALL_REVIEW_INIT:
      case LOAD_TOURS_INIT:
      case USER_UPDATE_INIT:
      case BOOK_TOUR_INIT:
      case FORGET_PASSWORD_INIT:
      case RESET_PASSWORD_INIT:
      case CREATE_TOUR_INIT:
      case UPDATE_TOUR_INIT:
      case DELETE_TOUR_INIT:
         draft.isLoading = true;
         return draft;
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
      case USER_LOAD_SUCCESS:
      case RESET_PASSWORD_SUCCESS:
         return {
            ...draft,
            isAuthenticated: true,
            isLoading: false,
         };
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case LOGOUT:
         return {
            ...draft,
            token: null,
            isAuthenticated: false,
            isLoading: false,
         };

      case LOAD_SINGLE_TOUR_SUCCESS:
      case GET_BOOKED_TOURS_SUCCESS:
      case DELETE_REVIEW_SUCCESS:
      case UPDATE_REVIEW_SUCCESS:
      case ADD_REVIEW_SUCCESS:
      case GET_ALL_REVIEW_SUCCESS:
      case LOAD_TOURS_SUCCESS:
      case USER_UPDATE_SUCCESS:
      case BOOK_TOUR_SUCCESS:
      case FORGET_PASSWORD_SUCCESS:
      case CREATE_TOUR_SUCCESS:
      case DELETE_TOUR_SUCCESS:
      case UPDATE_TOUR_SUCCESS:
         draft.isLoading = false;
         return draft;

      case USER_LOAD_FAIL:
      case LOAD_SINGLE_TOUR_FAIL:
      case GET_BOOKED_TOURS_FAIL:
      case DELETE_REVIEW_FAIL:
      case UPDATE_REVIEW_FAIL:
      case ADD_REVIEW_FAIL:
      case GET_ALL_REVIEW_FAIL:
      case LOAD_TOURS_FAIL:
      case USER_UPDATE_FAIL:
      case BOOK_TOUR_FAIL:
      case RESET_PASSWORD_FAIL:
      case FORGET_PASSWORD_FAIL:
      case CREATE_TOUR_FAIL:
      case UPDATE_TOUR_FAIL:
      case DELETE_TOUR_FAIL:
         draft.isLoading = false;
         return draft;
      default:
         return draft;
   }
});
