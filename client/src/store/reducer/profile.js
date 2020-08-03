import { USER_LOADED } from '../action/types';
import produce from 'immer';

const initialState = {
   users: null,
};

export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case USER_LOADED:
         draft.users = payload;
         return draft;
      default:
         return draft;
   }
});
