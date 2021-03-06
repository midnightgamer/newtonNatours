import React from 'react';
import './TourCard.css';
import Buttons from '../Buttons/Buttons';
import { HashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';

const TourCard = (props) => {
   const { tour, type, user } = props;
   let card = null;
   if (type === 'booked') {
      const { createdAt, paid, price } = tour;
      const {
         name,
         imageCover,
         ratingsQuantity,
         slug,
         ratingsAverage,
      } = tour.tour;
      card = (
         <div className="card">
            <div className="card__header">
               <div className="card__picture">
                  <div className="card__picture-overlay">&nbsp;</div>
                  <img
                     src={`http://localhost:5000/img/tours/${imageCover}`}
                     alt="Tour 1"
                     className="card__picture-img"
                  />
               </div>

               <h3 className="heading-tertirary">
                  <span>{name}</span>
               </h3>
            </div>

            <div className="card__details">
               <h4 className="card__sub-heading">
                  Booked At-{' '}
                  {new Date(createdAt).toLocaleString('en-un', {
                     month: 'long',
                     year: 'numeric',
                  })}
               </h4>
               <p className="card__text">{paid ? 'Payment Success' : ''}</p>
            </div>
            <div className="card__footer">
               <p>
                  <span className="card__footer-value">$ {price}</span>
                  <span className="card__footer-text">per person</span>
               </p>
               <p className="card__ratings">
                  <span className="card__footer-value">{ratingsAverage}</span>
                  <span className="card__footer-text">
                     rating ({ratingsQuantity})
                  </span>
               </p>
            </div>
            <div className="card__footer">
               <Link
                  to={`/tour/${slug}#add-review`}
                  scroll={(el) => {
                     el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                     });
                  }}
               >
                  <button className={'btn btn--green btn-small'}>
                     Add Review
                  </button>
               </Link>
            </div>
         </div>
      );
   } else {
      const {
         name,
         slug,
         difficulty,
         imageCover,
         duration,
         summary,
         maxGroupSize,
         locations,
         startDates,
         startLocation,
         ratingsAverage,
         ratingsQuantity,
         price,
      } = tour;
      card = (
         <div className="card">
            <div className="card__header">
               <div className="card__picture">
                  <div className="card__picture-overlay">&nbsp;</div>
                  <img
                     src={`/img/tours/${imageCover}`}
                     alt="Tour 1"
                     className="card__picture-img"
                  />
               </div>

               <h3 className="heading-tertirary">
                  <span>{name}</span>
               </h3>
            </div>

            <div className="card__details">
               <h4 className="card__sub-heading">
                  {difficulty} {duration}-day tour
               </h4>
               <p className="card__text">{summary}</p>
               <div className="card__data">
                  <svg className="card__icon">
                     <use xlinkHref="/img/icons.svg#icon-map-pin" />
                  </svg>
                  <span>{startLocation.description}</span>
               </div>
               <div className="card__data">
                  <svg className="card__icon">
                     <use xlinkHref="/img/icons.svg#icon-calendar" />
                  </svg>
                  <span>
                     {new Date(startDates[0]).toLocaleString('en-un', {
                        month: 'long',
                        year: 'numeric',
                     })}
                  </span>
               </div>
               <div className="card__data">
                  <svg className="card__icon">
                     <use xlinkHref="/img/icons.svg#icon-flag" />
                  </svg>
                  <span>{locations.length} stops</span>
               </div>
               <div className="card__data">
                  <svg className="card__icon">
                     <use xlinkHref="/img/icons.svg#icon-user" />
                  </svg>
                  <span>`{maxGroupSize} people`</span>
               </div>
            </div>

            <div className="card__footer">
               <p>
                  <span className="card__footer-value">$ {price}</span>
                  <span className="card__footer-text">per person</span>
               </p>
               <p className="card__ratings">
                  <span className="card__footer-value">{ratingsAverage}</span>
                  <span className="card__footer-text">
                     rating ({ratingsQuantity})
                  </span>
               </p>
               {user && user.role === 'admin' ? (
                  <Buttons to={`/tour/${slug}/editTour`}>Edit</Buttons>
               ) : (
                  <Buttons to={`/tour/${slug}`}>Details</Buttons>
               )}
            </div>
         </div>
      );
   }
   return card;
};

const mapStateToProps = (state) => ({
   user: state.profile.users,
});
export default connect(mapStateToProps)(TourCard);
