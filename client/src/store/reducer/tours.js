import { LOAD_SINGLE_TOUR, LOAD_TOURS } from '../action/types';
import produce from 'immer';

const initialState = {
   tours: [],
   tour: null,
   loading: true,
};

export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case LOAD_TOURS:
         draft.tours = payload;
         draft.loading = false;
         return draft;
      case LOAD_SINGLE_TOUR:
         draft.loading = false;
         draft.tour = payload;
         return draft;
      default:
         return draft;
   }
});
