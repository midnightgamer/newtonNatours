import { BOOK_TOUR_SUCCESS } from '../action/types';
import produce from 'immer';

const initialState = {};
export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case BOOK_TOUR_SUCCESS:
         return payload;
      default:
         return draft;
   }
});
