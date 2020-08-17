import React, { useEffect, useState } from 'react';
import TourCard from '../../shared/TourCard/TourCard';
import { connect } from 'react-redux';
import './Overview.css';
import { loadTours } from '../../store/action/tours';
import Spinner from '../../shared/Spinner/Spinner';

const Overview = ({ tours, loading, filteredTour }) => {
   useEffect(() => {
      document.title = `Natours | All Tours`;
   }, []);
   let role = 'user';
   let tour = [];
   let filtered = [];
   if (tours && tours.length > 0) {
      tour = tours.map((el) => {
         return <TourCard tour={el} key={el.name} />;
      });
   }
   if (filteredTour && filteredTour.length > 0) {
      filtered = filteredTour.map((el) => {
         return <TourCard tour={el} key={el.name} />;
      });
   }
   return loading ? (
      <Spinner />
   ) : (
      <main className={'main'}>
         <div className="card-container">
            {filteredTour.length > 0 ? filtered : tour}
         </div>
      </main>
   );
};
const mapStateToProps = (state) => ({
   tours: state.tours.tours,
   filteredTour: state.tours.filteredTour,
   loading: state.tours.loading,
   user: state.profile.users,
});

export default connect(mapStateToProps, { loadTours })(Overview);
