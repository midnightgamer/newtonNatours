import axios from 'axios';
import { showAlert } from './alert';
const stripe = stripe(
   'pk_test_51H9VXXH8UAzj9LgCkkEB00ENpsyq4FedxIEdJMbVpcKAx7nvWkNnTz2cUWWPDavI1DSqZXQBpBVTnVLWxB73Ri3q00T6V5FT4x'
);

export const bookTour = async (tourId) => {
   try {
      //   1) Get checkout session from the server
      const session = await axios(
         `/api/v1/bookings/checkout-session/${tourId}`
      );
      //   2) Create Checkout session + charge CC
      await stripe.redirectToCheckout({
         sessionId: session.data.session.id,
      });
   } catch (e) {
      showAlert('error', e);
   }
};
