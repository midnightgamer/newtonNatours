import React from 'react';

const Starts = ({ rating }) => {
   let star = [];
   for (let i = 0; i < 5; i++) {
      if (i < rating) {
         star.push(
            <svg key={i} className="reviews__star reviews__star--active">
               <use xlinkHref="/img/icons.svg#icon-star" />
            </svg>
         );
      } else {
         star.push(
            <svg key={i} className="reviews__star reviews__star--inactive">
               <use xlinkHref="/img/icons.svg#icon-star" />
            </svg>
         );
      }
   }
   return star;
};

export default Starts;
