import React, { useEffect } from 'react';
import TourCard from '../../shared/TourCard/TourCard';
import './BookedTour.css';
import { loadBookedTours } from '../../store/action/tours';
import { connect } from 'react-redux';
import Spinner from '../../shared/Spinner/Spinner';
import { setAlert } from '../../store/action/alert';
import NotFound from '../../shared/404/404';

const BookedTours = ({ bookedTours, loading, filteredTour, setAlert }) => {
   let tour = [];
   let filtered = [];
   if (bookedTours && bookedTours.length > 0) {
      tour = bookedTours.map((el) => {
         return <TourCard tour={el} key={el._id} type={'booked'} />;
      });
   }

   if (filteredTour && filteredTour.length > 0) {
      filtered = filteredTour.map((el) => {
         return <TourCard tour={el} key={el.name} />;
      });
   }

   useEffect(() => {
      document.title = `Natours | Booked tours`;
   }, []);
   if (!loading && bookedTours && bookedTours.length === 0) {
      return (
         <div>
            {setAlert('error', 'No booking found')}
            <NotFound msg={'No booking found'} />
         </div>
      );
   }
   return loading ? (
      <Spinner />
   ) : (
      <main className="main">
         <h2 className="heading-secondary ma-bt-lg">Booked tour</h2>
         <div className="card-container">
            {filteredTour.length > 0 ? filtered : tour}
         </div>
      </main>
   );
};
const mapStateToProps = (state) => ({
   bookedTours: state.tours.bookedTours,
   filteredTour: state.tours.filteredTour,
   loading: state.tours.loading,
});

export default connect(mapStateToProps, {
   loadBookedTours,
   setAlert,
})(BookedTours);
