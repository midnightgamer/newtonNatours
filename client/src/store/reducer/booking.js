import { BOOK_TOUR } from '../action/types';
import produce from 'immer';

const initialState = {};
export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case BOOK_TOUR:
         return payload;
      default:
         return draft;
   }
});
