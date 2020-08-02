import { USER_LOADED } from '../action/types';
import produce from 'immer';

const initialState = {
   users: [],
};

export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case USER_LOADED:
         draft.users.push(payload);
         return draft;
      default:
         return draft;
   }
});
