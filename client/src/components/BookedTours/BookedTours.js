import React, { useEffect } from 'react';
import TourCard from '../../shared/TourCard/TourCard';
import { loadBookedTours } from '../../store/action/tours';
import { connect } from 'react-redux';

const BookedTours = ({ tours, user, loadBookedTours, bookedTours }) => {
   useEffect(() => {
      loadBookedTours(user);
   }, [loadBookedTours, user]);
   let tour = [];
   if (bookedTours && bookedTours.length > 0) {
      tour = bookedTours.map((el) => {
         return <TourCard tour={el} key={el.name} type={'booked'} />;
      });
   }
   return (
      <main className={'main'}>
         <div className="card-container">{tour}</div>
      </main>
   );
};
const mapStateToProps = (state) => ({
   tours: state.tours.tours,
   bookedTours: state.tours.bookedTours,
   user: state.profile.users._id,
});

export default connect(mapStateToProps, { loadBookedTours })(BookedTours);
