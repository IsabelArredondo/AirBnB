import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot, spotDelete, } from "../../store/spots";
import { getAllReviewsBySpotId } from '../../store/reviews'
import Reviews from "./reviews";
import CreateReview from "../CreateReview/index"
import './spotId.css'

const SpotDetails = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const history = useHistory()

  const currentUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => (state.spots[spotId]));




  useEffect(() => {
    dispatch(findASpot(spotId));
  }, [dispatch, spotId, JSON.stringify(spots)]);

  const images = spots?.Images

  let numReviews = spots?.numReviews

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
      <div className="entireContainer">
        <div className="Header"><h1>Explore {spots?.name}</h1>

          <div className="spotButtons">
            {currentUser ? <> {currentUser?.user?.id === spots?.ownerId && <div>
              <button
                className="spot-button"
                onClick={editSpot}>Edit</button>
              <button
                className="spot-button"
                onClick={removeSpot}
              >Delete</button>
            </div>}</> : <></>}

          </div>


        </div>
        <div className="Description">
          <div className="star">{<i className="fas fa-star"></i>}</div>
          <div className="Details">
            <span className="starspace" >  </span>
            {!spots?.avgStarRating ? <span>New</span> : <span>{` ${spots?.avgStarRating?.toFixed(1)} `}</span>}
            <span>{` · ${spots?.numReviews} reviews`}</span>
            <span>{` · ${spots?.city}, ${spots?.state}, ${spots?.country} `}</span>
          </div>
        </div>
        <div className="imgPadding">
          <img className="spotImgById" src={spots?.previewImage} alt='pre-img' />
        </div>
        <div className="Header2" key={spots?.id}>
          <h2>{spots?.name} Hosted by {spots?.Owner?.firstName}</h2>
        </div>
        <div className="SpotsDescription">{spots?.description}</div>

        
        <div className="Reviews">
          <div className="reviewtwo">
            <h1>Reviews</h1>

            <Reviews spotId={spotId} numReviews={numReviews} />
          </div>

          <div className="reviewone">
            
          
                <CreateReview spotId1={spotId} />
              
            
          </div>

        </div>

      </div>
    </>
  )

}


export default SpotDetails;