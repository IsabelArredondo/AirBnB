import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import {getAllReviewsBySpotId, reviewDelete} from '../../store/reviews'
import { findASpot } from "../../store/spots";
import './review.css'




const Reviews = ({spotId}) => {
    const dispatch = useDispatch();
     const currentUser = useSelector((state) => state.session.user);
     
     const reviewsVariable = useSelector((state) => Object.values(state.reviews))

     const userReviews =  reviewsVariable.filter(review => review?.userId === currentUser?.id);
    //  console.log("THIS IS CURRENT USER", currentUser.id)
    //  console.log("userReviews", userReviews)
    //  console.log("reviewsVariable", reviewsVariable)

    useEffect(() => {
      dispatch(getAllReviewsBySpotId(spotId));
     }, [dispatch, spotId])
    
    

     const removeReview = (reviewId) => async (e) =>  {
      e.preventDefault()
      await dispatch(reviewDelete(reviewId))
      await (dispatch(getAllReviewsBySpotId(spotId)))
         dispatch(findASpot(spotId))
    }

    

   
    return (
        <>
          {reviewsVariable.map((reviewState, i) => {
            //  if (spotId === reviewState?.spotId) {
              //console.log(reviewState)
              return (
                <div className='all-reviews-div' key={reviewState?.id}>
                
                <div className="userStars">
                <span className='user'>{reviewState?.firstName} {reviewState?.lastName}</span>
                 <span className="space" >  </span>
                <div className="raitng">
                   <div className="star">{<i className="fas fa-star"></i>} </div>
                   <span className="starspace" >  </span>
                   <span className='stars'>{`${reviewState?.stars.toFixed(1)}`} </span>
                </div>
                </div>

                  <div>
                    <p className='actual-review'>{reviewState?.review} </p>

                    {currentUser &&
                     currentUser?.id === reviewState?.userId && (
                      
                      <div className="removebutton">
                        <button className="review-button" onClick={removeReview(reviewState.id)}>Delete Your Review</button>
                        
                      </div>
                    )}
                  </div>
                 
                </div>
              )
            //}  
          })}
        </>
      )
  }

export default Reviews;