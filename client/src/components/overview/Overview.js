import React, { useEffect } from 'react';
import TourCard from '../../shared/TourCard/TourCard';
import { connect } from 'react-redux';
import './Overview.css';
import reduxStore from '../../store/store';
import { loadTours } from '../../store/action/tours';

const Overview = ({ tours }) => {
   useEffect(() => {
      reduxStore.dispatch(loadTours());
   }, []);

   let tour = [];
   if (tours && tours.length > 0) {
      tour = tours.map((el) => {
         return <TourCard tour={el} key={el.name} />;
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
});
export default connect(mapStateToProps, { loadTours })(Overview);
