import React, { useState } from 'react';

const Starts = ({ rating, type, addRating }) => {
   const [reviewStar, setReviewStar] = useState(rating);
   let starUI = [];
   const setStar = (i) => {
      setReviewStar(i + 1);
      addRating(i + 1);
   };
   rating = type === 'add-review' ? reviewStar : rating;
   for (let i = 0; i < 5; i++) {
      if (i < rating) {
         starUI.push(
            type !== 'add-review' ? (
               <svg key={i} className={`reviews__star reviews__star--active  `}>
                  <use xlinkHref="/img/icons.svg#icon-star" />
               </svg>
            ) : (
               <svg
                  key={i}
                  onClick={() => setStar(i)}
                  className={`reviews__star reviews__star--active  ${
                     type === 'add-review' ? 'hover' : ''
                  }`}
               >
                  <use xlinkHref="/img/icons.svg#icon-star" />
               </svg>
            )
         );
      } else {
         starUI.push(
            type !== 'add-review' ? (
               <svg
                  key={i}
                  className={`reviews__star reviews__star--inactive  `}
               >
                  <use xlinkHref="/img/icons.svg#icon-star" />
               </svg>
            ) : (
               <svg
                  key={i}
                  onClick={() => setStar(i)}
                  className={`reviews__star reviews__star--inactive  ${
                     type === 'add-review' ? 'hover' : ''
                  }`}
               >
                  <use xlinkHref="/img/icons.svg#icon-star" />
               </svg>
            )
         );
      }
   }

   return starUI;
};

export default Starts;
