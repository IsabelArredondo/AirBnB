import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { Link, } from 'react-router-dom';

const Spots = () => {
    const dispatch = useDispatch();
   

    const allspots = useSelector((state) => Object.values(state.spots));
   
    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    return (
        <>
          <div className="all-spots-div">
          <div className="left"></div>
          {allspots.map((spot) => (
                <Link to={`/spots/${spot?.id}`} className="spot-link" key={spot?.id}>


                  <div className={`spot-div spot-div`}>
                    <div className="img-div">
                    </div>
                    <div className="spot-info">
                      <p className="spot-city-state">{`${spot?.city}, ${spot?.state}`}</p>
                      <p className="spot-price">{`$${spot?.price} / night`}</p>
                    </div>
                  </div>
                </Link>
          ))}
            
          </div>
        </>
      )

    
};

export default Spots;