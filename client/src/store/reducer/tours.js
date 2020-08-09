import {
   ADD_REVIEW,
   DELETE_REVIEW,
   GET_BOOKED_TOURS,
   LOAD_SINGLE_TOUR,
   LOAD_TOURS,
   UPDATE_REVIEW,
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
      case LOAD_SINGLE_TOUR:
         draft.tour = payload;
         draft.isLoading = false;
         return draft;
      case ADD_REVIEW:
         draft.tour.reviews.push(payload);
         return draft;
      case UPDATE_REVIEW:
         draft.tour.reviews.some((e, i) => {
            if (e._id === payload.id) {
               draft.tour.reviews[i] = payload.res;
            }
            return e._id === payload.id;
         });
         return draft;
      case DELETE_REVIEW:
         console.log(payload);
         const filterDraft = draft.tour.reviews.filter(
            (el) => el._id !== payload
         );
         draft.tour.reviews = filterDraft;
         return draft;
      default:
         return draft;
   }
});
