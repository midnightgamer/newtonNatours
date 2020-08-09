import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllReviewByUser } from '../../../store/action/review';
import ReviewCard from '../../../shared/ReviewCard/ReviewCard';

const Reviews = ({ getAllReviewByUser, reviews }) => {
   useEffect(() => {
      getAllReviewByUser();
   }, [getAllReviewByUser]);
   return (
      <section className="section-review">
         <div className="reviews">
            {reviews.map((review) => (
               <ReviewCard key={review._id} review={review} />
            ))}
         </div>
      </section>
   );
};
const mapStateToProps = (state) => ({
   reviews: state.profile.userReviews,
});
export default connect(mapStateToProps, { getAllReviewByUser })(Reviews);
