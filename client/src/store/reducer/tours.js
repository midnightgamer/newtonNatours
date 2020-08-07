import {
   ADD_REVIEW,
   GET_BOOKED_TOURS,
   LOAD_SINGLE_TOUR,
   LOAD_TOURS,
} from '../action/types';
import produce from 'immer';

const initialState = {
   bookedTours: [],
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
      case GET_BOOKED_TOURS:
         draft.bookedTours = payload;
         draft.isLoading = false;
         return draft;
      case ADD_REVIEW:
         draft.tour.reviews.push(payload);
         return draft;
      case LOAD_SINGLE_TOUR:
         draft.tour = payload;
         draft.isLoading = false;
         return draft;
      default:
         return draft;
   }
});
