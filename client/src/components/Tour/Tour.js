import React, { Fragment, useEffect, useState } from 'react';
import './Tour.css';
import { connect } from 'react-redux';
import { setSingleTour } from '../../store/action/tours';
import { bookTour } from '../../store/action/booking';
import {
   addNewReview,
   updateReview,
   deleteReview,
} from '../../store/action/review';
import Starts from '../../shared/Starts';
import { Link } from 'react-router-dom';
import ReviewCard from '../../shared/ReviewCard/ReviewCard';
import Spinner from '../../shared/Spinner/Spinner';

const Tour = (props) => {
   const {
      tour,
      loading,
      setSingleTour,
      match,
      user,
      isAuthenticated,
      bookTour,
      bookedTours,
      addNewReview,
      updateReview,
      deleteReview,
   } = props;
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');
   const [haveReview, setHaveReview] = useState(null);
   let isBooked = false;
   if (bookedTours && bookedTours.length > 0 && tour) {
      const isTourBooked = () => {
         bookedTours.forEach((el) => {
            let res = el.tour._id === tour._id ? (isBooked = true) : '';
         });
      };
      isTourBooked();
   }

   useEffect(() => {
      const scriptTag = document.createElement('script');
      scriptTag.src = '/js/mapBox.js';
      scriptTag.async = true;
      document.body.appendChild(scriptTag);
      //Load tour by slug
   }, []);
   useEffect(() => {
      setSingleTour(match.params.slug);
   }, [match.params.slug, setSingleTour]);
   useEffect(() => {
      if (tour && user) {
         tour.reviews.some((e) => {
            if (e.user._id === user._id) {
               setHaveReview(e);
               setComment(e.review);
               setRating(e.rating);
            } else {
               setHaveReview(null);
            }
            return e.user._id === user._id;
         });
      }
   }, [tour, user]);
   const onSubmit = (e, type) => {
      e.preventDefault();
      if (type === 'create') {
         const data = {
            review: comment,
            rating,
            tour: tour._id,
            user: user._id,
         };
         addNewReview(data);
      } else if (type === 'delete') {
         deleteReview(haveReview.id);
         setRating(0);
         setComment('');
      } else if (type === 'update') {
         const data = {
            review: comment,
            rating,
         };
         updateReview(data, haveReview.id);
      }
   };
   return loading || tour === null ? (
      <Spinner />
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
                           {new Date(tour.startDates[0]).toLocaleString(
                              'en-un',
                              {
                                 month: 'long',
                                 year: 'numeric',
                              }
                           )}
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
                  About the {tour.name}
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
                  <ReviewCard review={review} key={review._id} />
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
                  {isAuthenticated ? (
                     <button
                        id="bookTour"
                        className="btn btn--green span-all-rows"
                        onClick={() => bookTour(tour._id)}
                     >
                        Book tour now!
                     </button>
                  ) : (
                     <Link
                        to={'/login'}
                        className="btn btn--green span-all-rows"
                     >
                        Login to book tour now!
                     </Link>
                  )}
               </div>
            </div>
         </section>
         {isBooked ? (
            haveReview ? (
               <section className="section-review" id="add-review">
                  <div className="container">
                     <div className="login-form">
                        <h2 className="heading-secondary ma-bt-lg">
                           Add Review
                        </h2>
                        <form className="form">
                           <div className="form__group reviews-star">
                              <Starts
                                 type="add-review"
                                 rating={rating}
                                 addRating={(i) => setRating(i)}
                              />
                           </div>
                           <div className="form__group ma-bt-md">
                              <label className="form__label" htmlFor="comment">
                                 Your Comment
                              </label>
                              <textarea
                                 className="form__input"
                                 id="comment"
                                 onChange={(e) => setComment(e.target.value)}
                                 required="required"
                                 minLength="8"
                                 value={comment}
                              />
                           </div>
                           <div className="form__group">
                              <button
                                 type="submit"
                                 onClick={(e) => onSubmit(e, 'update')}
                                 className="btn btn--green btn-tiny"
                              >
                                 Update Review
                              </button>
                              &nbsp;
                              <button
                                 type="submit"
                                 onClick={(e) => onSubmit(e, 'delete')}
                                 className="btn btn--red btn-tiny"
                              >
                                 Delete Review
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </section>
            ) : (
               <section className="section-review" id="add-review">
                  <div className="container">
                     <div className="login-form">
                        <h2 className="heading-secondary ma-bt-lg">
                           Add Review
                        </h2>
                        <form className="form">
                           <div className="form__group reviews-star">
                              <Starts
                                 type="add-review"
                                 rating={rating}
                                 addRating={(i) => setRating(i)}
                              />
                           </div>
                           <div className="form__group ma-bt-md">
                              <label className="form__label" htmlFor="comment">
                                 Your Comment
                              </label>
                              <textarea
                                 className="form__input"
                                 id="comment"
                                 onChange={(e) => setComment(e.target.value)}
                                 required="required"
                                 minLength="8"
                              />
                           </div>
                           <div className="form__group">
                              <button
                                 type="submit"
                                 onClick={(e) => onSubmit(e, 'create')}
                                 className="btn btn--green btn-tiny"
                              >
                                 Add Review
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </section>
            )
         ) : (
            ''
         )}
      </Fragment>
   );
};
const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   tour: state.tours.tour,
   tours: state.tours,
   user: state.profile.users,
   loading: state.tours.loading,
   bookedTours: state.tours.bookedTours,
});
export default connect(mapStateToProps, {
   setSingleTour,
   addNewReview,
   updateReview,
   deleteReview,
   bookTour,
})(Tour);
