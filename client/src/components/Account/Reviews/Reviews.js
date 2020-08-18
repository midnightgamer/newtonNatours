import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllReviewByUser } from '../../../store/action/review';
import ReviewCard from '../../../shared/ReviewCard/ReviewCard';
import NotFound from '../../../shared/404/404';

const Reviews = ({ getAllReviewByUser, reviews }) => {
   useEffect(() => {
      getAllReviewByUser();
   }, [getAllReviewByUser]);

   useEffect(() => {
      document.title = `Natours | All reviews`;
   }, []);
   return (
      <section className="section-review">
         {reviews.length > 0 ? (
            <div className="reviews">
               {reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
               ))}
            </div>
         ) : (
            <NotFound msg={"You don't have any review to display"} />
         )}
      </section>
   );
};
const mapStateToProps = (state) => ({
   reviews: state.profile.userReviews,
});
export default connect(mapStateToProps, { getAllReviewByUser })(Reviews);
