import React from 'react';
import Starts from '../Starts';

const ReviewCard = ({ review, type }) => (
   <div key={review.user.name} className="reviews__card">
      <div className="reviews__avatar">
         <img
            src={`/img/users/${review.user.photo}`}
            alt="Jim Brown"
            className="reviews__avatar-img"
         />
         <h6 className="reviews__user">{review.user.name}</h6>
      </div>
      <p className="reviews__text">{review.review}</p>
      <div className="reviews__rating">
         <Starts rating={review.rating} />
      </div>
   </div>
);

export default ReviewCard;
