import { SET_ALERT, REMOVE_ALERT } from '../action/types';

const initialState = [];

export default function (draft = initialState, action) {
   const { type, payload } = action;
   switch (type) {
      case SET_ALERT:
         return [payload];
      case REMOVE_ALERT:
         return [];
      default:
         return draft;
   }
}
