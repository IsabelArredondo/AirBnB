import { csrfFetch } from './csrf';


const CREATE_SPOT = 'spots/CREATE_SPOT'

const LOAD_SPOTS = 'spots/load'

const GET_SPOT = "spots/get-spot";


const getSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot,
    };
};

const load = spots => ({
    type: LOAD_SPOTS,
    spots
});

const create = (newSpot) => ({
    type: CREATE_SPOT,
    newSpot
})

//Get a spot detail
export const findASpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(getSpot(spot));

        const all = {};
        all[spot.id] = spot
       return { ...all};
    }
    
};

export const createSpot = (data) => async (dispatch) => {

    const {
        name,
        description,
        address,
        city,
        state,
        country,
        lat,
        lng,
        price
    } = data;

    const response = await csrfFetch('/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            description,
            address,
            city,
            state,
            country,
            lat,
            lng,
            price
        })
    });

    const newSpot = await response.json();
    console.log('NEW SPOT', newSpot)
    dispatch(create(newSpot));
    console.log('NEWSPOT.NEWSPOT', newSpot)
    return newSpot
};






export const getAllSpots = () => async (dispatch) => {
    const response = await fetch("/spots")
    if (response.ok) {
        const spots = await response.json();
        dispatch(load(spots))
        const all = {};
        spots.spot.forEach((spot) => (all[spot.id] = spot));
        return { ...all };
    }
}




const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const allSpots = { ...state };
            action.spots.spot.forEach(spot => allSpots[spot.id] = spot);
            return { ...allSpots, ...state };
       

        case CREATE_SPOT:
        
            const newState = {
                ...state,
                [action.newSpot.id]: action.newSpot
            }
            return newState;

        case GET_SPOT: {
            const allSpots = { ...state }
            const spot = action.spot;
             allSpots[spot.id] = spot;
            return { ...allSpots, ...state };
        }
        default:
            return state;

    }
}

export default spotsReducer