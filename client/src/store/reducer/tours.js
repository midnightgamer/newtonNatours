import { LOAD_SINGLE_TOUR, LOAD_TOURS } from '../action/types';
import produce from 'immer';

const initialState = {
   tours: [],
   tour: '',
};

export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case LOAD_TOURS:
         draft.tours = payload;
         return draft;
      case LOAD_SINGLE_TOUR:
         draft.tour = payload;
         return draft;
      default:
         return draft;
   }
});
