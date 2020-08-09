const factory = require('./factoryController');
const Tour = require('../modals/tourModel');
const User = require('../modals/userModal');
const Booking = require('../modals/bookingModal');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// eslint-disable-next-line import/order
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
   console.log('session checkout crea');
   //   Get currently booked tour
   const tour = await Tour.findById(req.params.tourID);
   //    2 Create Checkout session
   const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/my-tours`,
      cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tourID,
      line_items: [
         {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
               `${req.protocol}://${req.get('host')}/img/tours/${
                  tour.imageCover
               }`,
            ],
            amount: tour.price * 100,
            currency: 'usd',
            quantity: 1,
         },
      ],
   });
   //    3 Send to client
   if (!session) {
      res.status(200).json({
         status: 'fail',
         session,
      });
   }
   res.status(200).json({
      status: 'success',
      session,
   });
});
const createBookingCheckout = async (sessionData) => {
   console.log('session checkout');
   const tour = sessionData.client_reference_id;
   const user = (await User.findOne({ email: sessionData.customer_email })).id;
   const price = sessionData.display_items[0].amount / 100;
   await Booking.create({
      tour,
      user,
      price,
   });
};
exports.webhookCheckout = (req, res, next) => {
   console.log('webhook');
   const signature = req.headers['stripe-signature'];
   let event;
   try {
      event = stripe.webhooks.constructEvent(
         req.body,
         signature,
         process.env.STRIPE_WEBHOOK_SECRET
      );
   } catch (e) {
      return res.status(400).send(`Webhook error ${e.message}`);
   }
   if (event.type === 'checkout.session.completed') {
      createBookingCheckout(event.data.object);
   }
   res.status(200).json({ received: true });
};
exports.getUserAllBooking = catchAsync(async (req, res, next) => {
   const bookings = await Booking.find({ user: req.params.id });
   if (!bookings.length) {
      next(new AppError(204, 'No Booking Found'));
   }
   res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
         data: bookings,
      },
   });
});
exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
