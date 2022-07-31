import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot, spotDelete} from "../../store/spots";
import Reviews from "./reviews";
import ReviewFormModal from '../CreateReview/createReviewModal'
import CreateReview from "../CreateReview/index"
import './spotId.css'

const SpotDetails = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);

  const dispatch = useDispatch();
  const history = useHistory() 

 const currentUser = useSelector((state) => state?.session);
 const spots = useSelector((state) => (state?.spots[spotId]));
 //console.log('SPOTS OWNER',spots.ownerId)


  useEffect(() => {
    dispatch(findASpot(spotId));
  }, [dispatch, spotId]);

  const images = spots?.Images

  let  numReviews = spots?.numReviews
  const removeSpot = (e) => {
    e.preventDefault()
    dispatch(spotDelete(spotId))
    history.push('/user/spots')
  }
  const editSpot = (e) => {
    e.preventDefault()
    history.push(`/edit/userSpot/${spotId}`)
    //dispatch(updateListing(spotId))
  }

  return (
    <>
      <h1>{spots?.name}</h1>
      <div key={spots?.id}>
      <div>
        {images?.map(image => {
          return (
            <div key={image?.url}>
              <img className="spotImgs" src={image?.url} alt="spot"></img>
            </div>
          )
        })}
      </div>
        <h2>Entire Home Hosted by {spots?.Owner?.firstName}</h2>
        <span>{spots?.avgStarRating}</span>
        <span>{` · ${spots?.numReviews} reviews`}</span>
        <span>{` · ${spots?.city}, ${spots?.state}, ${spots?.country}`}</span>
        <div>{spots?.description}</div>
      </div>
    
      <div>
      {currentUser &&
          currentUser?.user &&
          currentUser?.user.id && spots.id === spots?.ownerId && (
        <div>
              <button onClick={removeSpot}>Delete Spot</button>
              <button onClick={editSpot}>Edit Spot</button>
        </div>
        )}
      </div>
      
      <div>
        
       <h1>Reviews</h1>

       {currentUser &&
          currentUser?.user &&
          currentUser?.user.id !== spots?.ownerId &&  (
        <div>
             <CreateReview spotId1={spotId}/>
        </div>
        )}
       <Reviews spotId={spotId} numReviews={numReviews}/>
      </div>

    </>
  )

  }


export default SpotDetails;