import React from 'react';
import './TourCard.css';
import Buttons from '../Buttons/Buttons';
import { HashLink as Link } from 'react-router-hash-link';

const TourCard = (props) => {
   const { tour, type } = props;
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
               <h4 className="card__sub-heading">Booked At- {createdAt}</h4>
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
               <Link
                  to={`/tour/${slug}#add-review`}
                  scroll={(el) => {
                     el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                     });
                  }}
               >
                  <button className={'btn btn--green'}>Add Review</button>
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
                  {difficulty} {duration}-day tour
               </h4>
               <p className="card__text">{summary}</p>
               <div className="card__data">
                  <svg className="card__icon">
                     {/*<use xlink:href="img/icons.svg#icon-map-pin"></use>*/}
                  </svg>
                  <span>{startLocation.description}</span>
               </div>
               <div className="card__data">
                  <svg className="card__icon">
                     {/*<use xlink:href="img/icons.svg#icon-calendar"></use>*/}
                  </svg>
                  <span>
                     {startDates[0].toLocaleString('en-un', {
                        month: 'long',
                        year: 'numeric',
                     })}
                  </span>
               </div>
               <div className="card__data">
                  <svg className="card__icon">
                     {/*<use xlink:href="img/icons.svg#icon-flag"></use>*/}
                  </svg>
                  <span>{locations.length} stops</span>
               </div>
               <div className="card__data">
                  <svg className="card__icon">
                     {/*<use xlink:href="img/icons.svg#icon-user"></use>*/}
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
               <Buttons to={`/tour/${slug}`}>Details</Buttons>
            </div>
         </div>
      );
   }
   return card;
};

export default TourCard;
