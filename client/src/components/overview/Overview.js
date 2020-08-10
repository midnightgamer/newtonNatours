import React from 'react';
import TourCard from '../../shared/TourCard/TourCard';
import { connect } from 'react-redux';
import './Overview.css';
import { loadTours } from '../../store/action/tours';
import Spinner from '../../shared/Spinner/Spinner';

const Overview = ({ tours, loading }) => {
   let tour = [];
   if (tours && tours.length > 0) {
      tour = tours.map((el) => {
         return <TourCard tour={el} key={el.name} />;
      });
   }
   return loading || tour.length <= 0 ? (
      <Spinner />
   ) : (
      <main className={'main'}>
         <div className="card-container">{tour}</div>
      </main>
   );
};
const mapStateToProps = (state) => ({
   tours: state.tours.tours,
   loading: state.tours.loading,
});

export default connect(mapStateToProps, { loadTours })(Overview);
