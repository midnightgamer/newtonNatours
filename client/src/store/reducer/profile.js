import {
   GET_ALL_REVIEW,
   LOGOUT,
   USER_LOAD_FAIL,
   USER_LOADED,
   USER_UPDATED,
} from '../action/types';
import produce from 'immer';

const initialState = {
   users: null,
   isLoading: true,
   userReviews: [],
};

export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case USER_LOADED:
      case USER_UPDATED:
         draft.users = payload;
         draft.isLoading = false;
         return draft;
      case GET_ALL_REVIEW:
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
