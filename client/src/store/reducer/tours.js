import {
   ADD_REVIEW_SUCCESS,
   CLEAR_FILTERED_TOURS,
   CLEAR_SINGLE_TOUR,
   DELETE_REVIEW_SUCCESS,
   DELETE_TOUR_SUCCESS,
   FILTERED_TOURS,
   GET_BOOKED_TOURS_SUCCESS,
   LOAD_SINGLE_TOUR_SUCCESS,
   LOAD_TOURS_SUCCESS,
   LOGOUT,
   UPDATE_REVIEW_SUCCESS,
   UPDATE_TOUR_IMAGES_SUCCESS,
   UPDATE_TOUR_SUCCESS,
} from '../action/types';
import produce from 'immer';

const initialState = {
   bookedTours: [],
   tour: null,
   isLoading: true,
   filteredTour: [],
   tours: [],
};

export default produce((draft = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case LOAD_TOURS_SUCCESS:
         draft.tours = payload;
         draft.isLoading = false;
         return draft;
      case UPDATE_TOUR_SUCCESS:
      case UPDATE_TOUR_IMAGES_SUCCESS:
         draft.tour = payload.res;
         draft.tours.some((e, i) => {
            if (e._id === payload.id) {
               draft.tours[i] = payload.res;
            }
            return e._id === payload.id;
         });
         return draft;
      case GET_BOOKED_TOURS_SUCCESS:
         draft.bookedTours = payload;
         draft.isLoading = false;
         return draft;
      case LOAD_SINGLE_TOUR_SUCCESS:
         draft.tour = payload;
         draft.isLoading = false;
         return draft;
      case ADD_REVIEW_SUCCESS:
         draft.tour.reviews.push(payload);
         return draft;
      case UPDATE_REVIEW_SUCCESS:
         draft.tour.reviews.some((e, i) => {
            if (e._id === payload.id) {
               draft.tour.reviews[i] = payload.res;
            }
            return e._id === payload.id;
         });
         return draft;
      case DELETE_REVIEW_SUCCESS:
         const filterDraft = draft.tour.reviews.filter(
            (el) => el._id !== payload
         );
         draft.tour.reviews = filterDraft;
         return draft;
      case DELETE_TOUR_SUCCESS:
         const filterTours = draft.tours.filter((el) => el._id !== payload);
         draft.tours = filterTours;
         draft.tour = '';
         return draft;
      case FILTERED_TOURS:
         draft.filteredTour = payload;
         return draft;
      case CLEAR_FILTERED_TOURS:
         return (draft.filteredTour = []);
      case CLEAR_SINGLE_TOUR:
         draft.tour = null;
         draft.isLoading = true;
         return draft;
      case LOGOUT:
         draft.bookedTours = null;
         return draft;
      default:
         return draft;
   }
});
