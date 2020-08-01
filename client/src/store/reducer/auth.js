import {
   LOGIN_SUCCESS,
   AUTH_ERROR,
   LOGIN_FAIL,
   LOGOUT,
   REGISTER_FAIL,
   REGISTER_SUCCESS,
} from '../action/types';
import produce from 'immer';

const initialState = {
   isAuthenticated: false,
};

export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         return {
            ...draft,
            isAuthenticated: true,
         };
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
         return {
            ...draft,
            token: null,
            isAuthenticated: false,
         };
      default:
         return draft;
   }
});
