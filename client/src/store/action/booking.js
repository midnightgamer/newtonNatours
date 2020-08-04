import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';
import { BOOK_TOUR } from './types';
import Stripe from 'stripe';

export const bookTour = (tourId) => async (dispatch) => {
   const stripe = Stripe(
      'sk_test_51H9VXXH8UAzj9LgCu81692Nlh1DYWonHKF8swHNf6b8H0voxPNNpuLkfTQ4urLTboqQ57j3a2NgaYKZrctjXMrLk00hPMqwZ8z'
   );
   try {
      //   1) Get checkout session from the server
      const session = await axiosInstance(
         `/bookings/checkout-session/${tourId}`
      );
      //   2) Create Checkout session + charge CC
      await stripe.redirectToCheckout({
         sessionId: session.data.session.id,
      });
      dispatch({
         type: BOOK_TOUR,
         payload: session,
      });
   } catch (e) {
      setAlert('error', e);
   }
};
