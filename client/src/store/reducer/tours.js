import { LOAD_TOURS } from '../action/types';
import produce from 'immer';

const initialState = [];

export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case LOAD_TOURS:
         return payload;
      default:
         return draft;
   }
});
