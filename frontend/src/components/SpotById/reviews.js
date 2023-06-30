import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import {getAllReviewsBySpotId, reviewDelete} from '../../store/reviews'
import { findASpot } from "../../store/spots";
import './review.css'




const Reviews = ({spotId, spots}) => {
    const dispatch = useDispatch();
     const currentUser = useSelector((state) => state.session.user);
     
     const reviewsVariable = useSelector((state) => Object.values(state.reviews))
       console.log(reviewsVariable)
     const userReviews =  reviewsVariable.filter(review => review?.userId === currentUser?.id);
   
    useEffect(() => {
      // dispatch(findASpot(spotId));
      dispatch(getAllReviewsBySpotId(spotId));
     }, [dispatch, spotId])
    
    

     const removeReview = (reviewId) => async (e) =>  {
      e.preventDefault()
      await dispatch(reviewDelete(reviewId))
      await (dispatch(getAllReviewsBySpotId(spotId)))
         dispatch(findASpot(spotId))
    }

    const decimle = (value) => {
      let num = parseFloat(value)
      return num.toFixed(1)
    };

   
    return (
        <>
          {reviewsVariable.map((reviewState) => {
        
              return (
                
                <div className='all-reviews-div' key={reviewState?.id}>
                  <div className="heading">
                  <i id='headingstar'className="fas fa-star headeridspotstar"></i> {!spots?.avgStarRating ? <span> New </span> : <span>{decimle(spots?.avgStarRating)} </span>}
                  <div id='dot'><i  class="fa-sharp fa-solid fa-circle"></i></div>
                   {reviewState.length}
                   {spots?.numReviews} reviews
                   </div>
                  
                <div className="userStars">
                <i id='individualreview' class="fa-solid fa-circle-user"></i>
                <span className='reviewuser'>{reviewState?.firstName} {reviewState?.lastName}</span>
                {/* <div className="raitng">
                   <div className="star">{<i className="fas fa-star"></i>} </div>
                   <span className="starspace" >  </span>
                   <span className='stars'>{`${reviewState?.stars}`} </span>
                </div> */}
                
                </div>
                <div className='actual-review'>
                  <p className='actual-review'>{reviewState?.review} </p>
                </div>

                  <div>
                    

                    {currentUser &&
                     currentUser?.id === reviewState?.userId && (
                      
                      <div className="removebutton">
                        <button className="review-button" onClick={removeReview(reviewState.id)}>Delete</button>
                        
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