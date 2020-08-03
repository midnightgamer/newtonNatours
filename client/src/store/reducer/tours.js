import { LOAD_SINGLE_TOUR, LOAD_TOURS, LOADED, LOADING } from '../action/types';
import produce from 'immer';

const initialState = {
   tours: [],
   tour: null,
   isLoading: true,
};

export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case LOAD_TOURS:
         draft.tours = payload;
         draft.isLoading = false;
         return draft;
      case LOAD_SINGLE_TOUR:
         draft.tour = payload;
         draft.isLoading = false;
         return draft;
      default:
         return draft;
   }
});
