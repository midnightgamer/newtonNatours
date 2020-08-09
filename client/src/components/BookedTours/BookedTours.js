import React from 'react';
import TourCard from '../../shared/TourCard/TourCard';
import { loadBookedTours } from '../../store/action/tours';
import { connect } from 'react-redux';

const BookedTours = ({ bookedTours }) => {
   let tour = [];
   if (bookedTours && bookedTours.length > 0) {
      tour = bookedTours.map((el) => {
         return <TourCard tour={el} key={el._id} type={'booked'} />;
      });
   }
   return (
      <main className={'main'}>
         <div className="card-container">{tour}</div>
      </main>
   );
};
const mapStateToProps = (state) => ({
   bookedTours: state.tours.bookedTours,
});

export default connect(mapStateToProps, { loadBookedTours })(BookedTours);
