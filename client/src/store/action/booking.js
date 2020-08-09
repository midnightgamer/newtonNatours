import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';
import { BOOK_TOUR } from './types';
import stripe from 'stripe';
export const bookTour = (tourId) => async (dispatch) => {
   try {
      const Strip = stripe(
         'sk_test_51H9VXXH8UAzj9LgCu81692Nlh1DYWonHKF8swHNf6b8H0voxPNNpuLkfTQ4urLTboqQ57j3a2NgaYKZrctjXMrLk00hPMqwZ8z'
      );
      //   1) Get checkout session from the server
      const session = await axiosInstance(
         `/bookings/checkout-session/${tourId}`
      );
      //   2) Create Checkout session + charge CC
      await Strip.redirectToCheckout({
         sessionId: session.data.session.id,
      });
      dispatch({
         type: BOOK_TOUR,
         payload: session,
      });
   } catch (e) {
      console.log(e);
      setAlert('error', e);
   }
};
