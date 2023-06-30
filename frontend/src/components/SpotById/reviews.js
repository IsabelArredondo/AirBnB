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
                  <h1><i className="fas fa-star headeridspotstar"></i> {!spots?.avgStarRating ? <span> New </span> : <span>{decimle(spots?.avgStarRating)} <i id='dot' class="fa-sharp fa-solid fa-circle"></i> {reviewState.length}</span>}
                   {spots?.numReviews} Reviews</h1>
                  
                <div className="userStars">
                <svg className="profile" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', margin: '1px', height: '100%', width: '100%', fill: 'currentcolor' }} width={30} height={30}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" fill="#717171" /></svg>

                <span className='reviewuser'>{reviewState?.firstName} {reviewState?.lastName}</span>
                {/* <div className="raitng">
                   <div className="star">{<i className="fas fa-star"></i>} </div>
                   <span className="starspace" >  </span>
                   <span className='stars'>{`${reviewState?.stars}`} </span>
                </div> */}
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