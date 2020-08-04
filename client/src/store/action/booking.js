import axiosInstance from '../../axiosInstance';
import { setAlert } from './alert';
import { BOOK_TOUR } from './types';
import Stripe from 'stripe';

export const bookTour = (tourId) => async (dispatch) => {
   const stripe = Stripe(
      'pk_test_51H9VXXH8UAzj9LgCkkEB00ENpsyq4FedxIEdJMbVpcKAx7nvWkNnTz2cUWWPDavI1DSqZXQBpBVTnVLWxB73Ri3q00T6V5FT4x'
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
