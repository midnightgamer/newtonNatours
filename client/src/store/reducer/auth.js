import {
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   REGISTER_FAIL,
   REGISTER_SUCCESS,
   USER_LOADED,
} from '../action/types';
import produce from 'immer';

const initialState = {
   isAuthenticated: false,
   isLoading: true,
};

export default produce((draft = initialState, action) => {
   const { type } = action;
   switch (type) {
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
      case USER_LOADED:
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
      default:
         return draft;
   }
});
