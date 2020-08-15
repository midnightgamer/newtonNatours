import {
   GET_ALL_REVIEW_SUCCESS,
   LOGOUT,
   RESET_PASSWORD_SUCCESS,
   USER_LOAD_FAIL,
   USER_LOAD_SUCCESS,
   USER_UPDATE_SUCCESS,
} from '../action/types';
import produce from 'immer';

const initialState = {
   users: '',
   isLoading: true,
   userReviews: [],
};

export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case USER_LOAD_SUCCESS:
      case RESET_PASSWORD_SUCCESS:
      case USER_UPDATE_SUCCESS:
         draft.users = payload;
         draft.isLoading = false;
         return draft;
      case GET_ALL_REVIEW_SUCCESS:
         draft.userReviews = payload;
         return draft;
      case USER_LOAD_FAIL:
      case LOGOUT:
         draft.user = null;
         return draft;
      default:
         return draft;
   }
});
