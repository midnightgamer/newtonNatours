import React, { Fragment, useEffect } from 'react';
import './Tour.css';
import { connect } from 'react-redux';
import { setSingleTour } from '../../store/action/tours';
import Starts from '../../shared/Starts';

const Tour = (props) => {
   const { tour, loading, setSingleTour, match } = props;

   useEffect(() => {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'http://localhost:5000/js/mapBox.js';
      scriptTag.async = true;
      document.body.appendChild(scriptTag);
      setSingleTour(match.params.slug);
   }, [match.params.slug, setSingleTour]);
   return loading || tour === null ? (
      <div>Loading...</div>
   ) : (
      <Fragment>
         <section className="section-header">
            <div className="header__hero">
               <div className="header__hero-overlay">&nbsp;</div>
               <img
                  className="header__hero-img"
                  src={`/img/tours/${tour.imageCover}`}
                  alt="The Sea Explorer"
               />
            </div>
            <div className="heading-box">
               <h1 className="heading-primary">
                  <span>{tour.name}</span>
               </h1>
               <div className="heading-box__group">
                  <div className="heading-box__detail">
                     <svg className="heading-box__icon">
                        <use xlinkHref={'/img/icons.svg#icon-clock'} />
                     </svg>
                     <span className="heading-box__text">
                        {tour.duration} days
                     </span>
                  </div>
                  <div className="heading-box__detail">
                     <svg className="heading-box__icon">
                        <use xlinkHref={`/img/icons.svg#icon-map-pin`} />
                     </svg>
                     <span className="heading-box__text">
                        {tour.startLocation.description}
                     </span>
                  </div>
               </div>
            </div>
         </section>

         <section className="section-description">
            <div className="overview-box">
               <div>
                  <div className="overview-box__group">
                     <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                     <div className="overview-box__detail">
                        <svg className="overview-box__icon">
                           <use xlinkHref={`/img/icons.svg#icon-calendar`} />
                        </svg>
                        <span className="overview-box__label">Next date</span>
                        <span className="overview-box__text">
                           {tour.startDates[0].toLocaleString('en-un', {
                              month: 'long',
                              year: 'numeric',
                           })}
                        </span>
                     </div>
                     <div className="overview-box__detail">
                        <svg className="overview-box__icon">
                           <use xlinkHref={`/img/icons.svg#icon-trending-up`} />
                        </svg>
                        <span className="overview-box__label">Difficulty</span>
                        <span className="overview-box__text">
                           {tour.difficulty}
                        </span>
                     </div>
                     <div className="overview-box__detail">
                        <svg className="overview-box__icon">
                           <use xlinkHref={'/img/icons.svg#icon-user'} />
                        </svg>
                        <span className="overview-box__label">
                           Participants
                        </span>
                        <span className="overview-box__text">
                           {tour.maxGroupSize} people
                        </span>
                     </div>
                     <div className="overview-box__detail">
                        <svg className="overview-box__icon">
                           <use xlinkHref="/img/icons.svg#icon-star" />
                        </svg>
                        <span className="overview-box__label">Rating</span>
                        <span className="overview-box__text">
                           {tour.ratingsAverage} / 5
                        </span>
                     </div>
                  </div>

                  <div className="overview-box__group">
                     <h2 className="heading-secondary ma-bt-lg">
                        Your tour guides
                     </h2>
                     {tour.guides.map((guide) => (
                        <div className="overview-box__detail" key={guide.name}>
                           <img
                              src={`/img/users/${guide.photo}`}
                              alt="Intern"
                              className="overview-box__img"
                           />
                           <span className="overview-box__label">
                              {guide.role}
                           </span>
                           <span className="overview-box__text">
                              {guide.name}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="description-box">
               <h2 className="heading-secondary ma-bt-lg">
                  About the park camper tour
               </h2>
               {tour.description.split('\n').map((el, i) => {
                  return (
                     <p key={i} className="description__text">
                        {el}
                     </p>
                  );
               })}
               <p className="description__text">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum!
               </p>
            </div>
         </section>

         <section className="section-pictures">
            {tour.images.map((value) => (
               <div key={value} className="picture-box">
                  <img
                     className="picture-box__img picture-box__img--1"
                     src={`/img/tours/${value}`}
                     alt="The Park Camper Tour 1"
                  />
               </div>
            ))}
         </section>

         <section className="section-map">
            <div id="map" data-locations={JSON.stringify(tour.locations)} />
         </section>

         <section className="section-reviews">
            <div className="reviews">
               {tour.reviews.map((review) => (
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
               ))}
            </div>
         </section>

         <section className="section-cta">
            <div className="cta">
               <div className="cta__img cta__img--logo">
                  <img
                     src={` /img/logo-white.png`}
                     alt="Natours logo"
                     className=""
                  />
               </div>
               {tour.images.map((img) => (
                  <img
                     key={img}
                     src={`${process.env.REACT_APP_API_ROUTE}/img/tours/${img}`}
                     alt=""
                     className="cta__img cta__img--1"
                  />
               ))}
               <div className="cta__content">
                  <h2 className="heading-secondary">
                     What are you waiting for?
                  </h2>
                  <p className="cta__text">
                     {tour.duration} days. 1 adventure. Infinite memories. Make
                     it yours today!
                  </p>
                  <button className="btn btn--green span-all-rows">
                     Book tour now!
                  </button>
               </div>
            </div>
         </section>
      </Fragment>
   );
};
const mapStateToProps = (state) => ({
   tour: state.tours.tour,
   loading: state.tours.loading,
});
export default connect(mapStateToProps, { setSingleTour })(Tour);