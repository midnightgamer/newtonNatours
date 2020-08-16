import React, { useEffect } from 'react';
import TourCard from '../../shared/TourCard/TourCard';
import { loadBookedTours } from '../../store/action/tours';
import { connect } from 'react-redux';
import Spinner from '../../shared/Spinner/Spinner';

const BookedTours = ({ bookedTours, loading }) => {
   let tour = [];
   if (bookedTours && bookedTours.length > 0) {
      tour = bookedTours.map((el) => {
         return <TourCard tour={el} key={el._id} type={'booked'} />;
      });
   }

   useEffect(() => {
      document.title = `Natours | Booked tours`;
   }, []);
   return loading || tour.length <= 0 ? (
      <Spinner />
   ) : (
      <main className={'main'}>
         <h2 className="heading-secondary ma-bt-lg">Booked tour</h2>
         <div className="card-container">{tour}</div>
      </main>
   );
};
const mapStateToProps = (state) => ({
   bookedTours: state.tours.bookedTours,
   loading: state.tours.loading,
});

export default connect(mapStateToProps, { loadBookedTours })(BookedTours);
