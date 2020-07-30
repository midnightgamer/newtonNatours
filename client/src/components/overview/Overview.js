import React from 'react';
import TourCard from '../../shared/TourCard/TourCard';
import './Overview.css';
const Overview = (props) => (
   <main className={'main'}>
      <div className="card-container">
         <TourCard />
         <TourCard />
         <TourCard />
         <TourCard />
         <TourCard />
      </div>
   </main>
);

export default Overview;
