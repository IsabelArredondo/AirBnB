import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot } from "../../store/spots";
import './spotId.css'

const SpotDetails = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const history = useHistory()

  const spots = useSelector((state) => (state.spots[spotId]));
   console.log('THIS IS SPOTID FOLDER', spots)
  const sessionUser = useSelector((state) => state.session.user)


  useEffect(() => {
    dispatch(findASpot(spotId));
  }, [dispatch, spotId]);

  return (
    <>
      <h1>{spots?.name}</h1>
      <div key={spots?.id}>
        <span>{spots?.avgStarRating}</span>
        <span>{` · ${spots?.numReviews} reviews`}</span>
        <span>{` · ${spots?.city}, ${spots?.state}, ${spots?.country}`}</span>
      </div>
      <div>
        {spots?.images?.map(image => {
          return (
            <div key={image.url}>
              <img src={`${image?.url}`} alt="spot"></img>
            </div>
          )
        })}
      </div>
      <div>{spots?.description}</div>

   
    </>
  )
}



export default SpotDetails;