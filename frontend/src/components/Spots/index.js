import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { Link, } from 'react-router-dom';
import './spots.css'

const Spots = () => {
    const dispatch = useDispatch();
   

    const allspots = useSelector((state) => Object.values(state.spots));
    
    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    return (
        <>
          <div className="all-spots-div">
          
          {allspots.map((spot) => (
                <Link to={`/getspots/${spot?.id}`} className="spot-link" key={spot?.id}>


                  <div className={`spot-div spot-div`}>
                    <div className="img-div">
                      <img className="spotImg" src={spot?.previewImage} alt='pre-img'/> 
                    </div>
                    <div className="spot-info">
                      {/* <h3 className="spotName">{spot?.name}</h3> */}
                      <div className='adressraiting'>
                      <p className="spot-city-state">{`${spot?.city}, ${spot?.state}`}</p>
                      <span className='space'></span>
                      <div className="star">{<i className="fas fa-star"></i>}</div>
                      <span className='space'></span>
                      {!spot?.Reviews ? <span>New</span> : <span>{` ${spot?.Reviews?.length} `}</span>}
                      </div>
                      <p className="spot-price">{`$${spot?.price} night`}</p>
                    </div>
                  </div>
                </Link>
          ))}
            
          </div>
        </>
      )

    
};

export default Spots;