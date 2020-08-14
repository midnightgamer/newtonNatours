import React, { useEffect, useState } from 'react';
import TourCard from '../../shared/TourCard/TourCard';
import { connect } from 'react-redux';
import './Overview.css';
import { loadTours } from '../../store/action/tours';
import Spinner from '../../shared/Spinner/Spinner';

const Overview = ({ tours, loading, user }) => {
   let role = 'user';
   let tour = [];
   if (tours && tours.length > 0) {
      tour = tours.map((el) => {
         return <TourCard tour={el} key={el.name} />;
      });
   }
   return loading ? (
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
   user: state.profile.users,
});

export default connect(mapStateToProps, { loadTours })(Overview);
