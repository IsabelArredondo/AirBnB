import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot, spotDelete, } from "../../store/spots";
import { Modal } from "../../context/Modal";
import Reviews from "./reviews";
import CreateReview from "../CreateReview/index"
import './spotId.css'

const SpotDetails = () => {
  const [showPolicy, setPolicy] = useState(false)
  const [showMenu, setShowMenu] = useState(false);

  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const history = useHistory()

  const currentUser = useSelector((state) => state.session.user);
  //console.log("THIS IS CURRENT USER", currentUser)
  const spots = useSelector((state) => (state.spots[spotId]));
  // console.log("THIS IS CURRENT SPOTS", spots)

  const close = (e) => {
    e.preventDefault();

    setPolicy(false)

  };
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    dispatch(findASpot(spotId));
    // dispatch(getAllReviewsBySpotId(spotId))
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
        <div className="Header"><h1>{spots?.name}</h1>

          <div className="spotButtons">
            {currentUser ? <> {currentUser?.id === spots?.ownerId && 
            <div>
              <button id="spotmenu" onClick={openMenu}>
                <i class="fa-solid fa-ellipsis"></i>
              </button>

              {showMenu && (
              <div id="editdelete">
              <button
                id="dropdown_second"
                className="spotbutton"
                onClick={editSpot}>Edit</button>
              <button
                id="dropdown_third"
                className="spotbutton"
                onClick={removeSpot}
              >Delete</button>
              </div>
              )}
            </div>
            }
            </> 
            
            
            : <></>}

          </div>


        </div>
        <div id='onespot' className="Description">
          <div className="starbyid">
            <i id='idspotstar' className="fas fa-star"></i> {!spots?.avgStarRating ? <span> New</span> : <span>{` ${spots?.avgStarRating?.toFixed(1)} `}</span>}
            <span>{` · ${spots?.numReviews} reviews`}</span>
            <span>{` · ${spots?.city}, ${spots?.state}, ${spots?.country} `}</span>

          </div>

        </div>
        <div className="imgPadding">
          <img className="spotImgById" src={spots?.previewImage} alt='pre-img' />

          <div className="imgboxes">
            <img className="rightImg" src={spots?.previewImage} />
            <img className="rightImg" src={spots?.previewImage} />
          </div>

          <div className="imgboxes">
            <img id='toplastright' className="rightImg" src={spots?.previewImage} />
            <img id="bottomlastright" className="rightImg" src={spots?.previewImage} />
          </div>
        </div>


        <div className="Header2" key={spots?.id}>
          <h2>{spots?.name} Hosted by {spots?.Owner?.firstName}</h2>
        </div>

        <div className="Spotspoliciy">

          <img className="air" src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg'></img>

          <p >
            Every booking includes free protection from Host cancellations,
            listing inaccuracies, and other issues like trouble checking in.
          </p>
          <button className="learnmore" onClick={() => setPolicy(true)}>Learn more</button>
        </div>

        {showPolicy && (
          <Modal onClose={() => setPolicy(false)}>
            <div className="close"><button id="policyclose" onClick={close}><i className="fa-solid fa-x"></i></button></div>

            <div className="bookingprotection">
              
              <div id='inside' className="Spotspoliciy">

                <img className="air" src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg'></img>

                <p >
                  Every booking includes free protection from Host cancellations,
                  listing inaccuracies, and other issues like trouble checking in.
                </p>
              </div>

              <h3 id="h3">Booking Protection Guarantee</h3>
              <div className="paragraph">
                In the unlikely event a Host needs to cancel your booking within 30
              days of check-in, we’ll find you a similar or better home, or we’ll refund you.
              </div>
              
              <h3 id="h3">Check-In Guarantee</h3>
              <div className="paragraph">
              If you can’t check into your home and the Host cannot resolve the issue, we’ll find you a similar or better home for the length of your original stay, or we’ll refund you.
              </div>

              <h3 id="h3">Get-What-You-Booked Guarantee</h3>
              <div className="paragraph">
              If at any time during your stay you find your listing isn't as advertised—for example, the refrigerator stops working and your Host can’t easily fix it, or it has fewer bedrooms than listed—you'll have three days to report it and we’ll find you a similar or better home, or we’ll refund you.
              </div>

              <h3 id="h3">24-hour Safety Line</h3>
              <div className="paragraph">              
              If you ever feel unsafe, you’ll get priority access to specially-trained safety agents, day or night.
            </div>
            </div>
          </Modal>
        )}
        <div className="SpotsDescription">{spots?.description}</div>


        <div className="Reviews">
          <div className="reviewtwo">
            <h1><i className="fas fa-star headeridspotstar"></i> {!spots?.avgStarRating ? <span> New </span> : <span>{` ${spots?.avgStarRating?.toFixed(1)} `}</span>}
              {spots?.numReviews} Reviews</h1>

            <Reviews spotId={spotId} numReviews={numReviews} />
          </div>


          <div className="reviewone">
            {
              currentUser &&
              currentUser?.id !== spots?.ownerId && (

                <CreateReview spotId1={spotId} />

              )}
          </div>

        </div>

      </div>
    </>
  )

}


export default SpotDetails;