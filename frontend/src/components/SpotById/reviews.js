import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import {getAllReviewsBySpotId, reviewDelete} from '../../store/reviews'


const Reviews = ({spotId, numReviews}) => {
    const dispatch = useDispatch();
     const currentUser = useSelector((state) => state.session.user);
     
     const reviewsVariable = useSelector((state) => Object.values(state?.reviews))

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
    }

    

   
    return (
        <>
          {reviewsVariable.map((reviewState, i) => {
            //  if (spotId === reviewState?.spotId) {
              //console.log(reviewState)
              return (
                <div className='all-reviews-div' key={reviewState?.id}>
                
                <div>
                <p className='stars'>{reviewState?.firstName} {reviewState?.lastName}</p>
                <p className='user'>{`${reviewState?.stars} stars`} </p>
                    <p className='actual-review'>{reviewState?.review} </p>

                    {currentUser &&
                     currentUser?.id === reviewState?.userId && (
                      
                      <div>
                        <button onClick={removeReview(reviewState.id)}>Delete Review</button>
                        
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