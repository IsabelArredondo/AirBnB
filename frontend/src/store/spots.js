import { csrfFetch } from './csrf';


const CREATE_SPOT = 'spots/CREATE_SPOT'
const LOAD_SPOTS = 'spots/load'
const GET_SPOT = 'spots/get-spot'
const DELETE_SPOT = 'spots/delete-spot'
const EDIT_SPOT = 'spots/update-spot'

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

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId,
    };
};

const update = (updatedListing) => {
    return {
        type: EDIT_SPOT,
        updatedListing
    }
}

//DELETE
export const spotDelete = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/spots/delete/${spotId}`, {
        method: "DELETE",
        body: JSON.stringify({
            spotId,
        }),
    });
    if (response.ok) {
    const res = await response.json();
    dispatch(deleteSpot(spotId));
    return res;
    }
};


//Get a spot detail
export const findASpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(getSpot(spot));

        const all = {};
        all[spot.id] = spot
        return { ...all };
    }

};


//CREATE SPOT
export const createSpot = (data) => async (dispatch) => {

    const response = await csrfFetch('/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const newData = await response.json();
        dispatch(create(newData));
        return newData
    }

};

//EDIT SPOT 
export const updateListing = (formValue, id) => async (dispatch) => {

    const {
        name,
        description,
        address,
        city,
        state,
        country,
        lat,
        lng,
        previewImage,
        price
    } = formValue;

    const response = await csrfFetch(`/spots/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            description,
            address,
            city,
            state,
            country,
            lat,
            lng,
            previewImage,
            price
        })
    });

    const updatedListing = await response.json();

    dispatch(update(updatedListing));
    
};


//GET ALL SPOTS
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
            // do not spead stale state (causes duplicates) NEVER DO THIS IN LOAD
            const allSpots = {};
            action.spots.spot.forEach(spot => allSpots[spot.id] = spot);
            return { ...allSpots };


        case CREATE_SPOT:
            //console.log('ACTION',action)
            const newerState = {...state}
            //console.log('newerState', newerState)
            newerState[action.newSpot.id] = action.newSpot
            //console.log('action.newSpot',action.newSpot)
            return newerState
           
        case GET_SPOT: {
            const allSpots = {}
            const spot = action.spot;
            allSpots[spot.id] = spot;
            return allSpots;
        }



        case DELETE_SPOT: {
            const newState2 = { ...state };
            delete newState2[action.spotId];
            return newState2;
        }

        case EDIT_SPOT:
            // const newState3 = { ...state }
            // newState3[action.updatedListing.id] = action.updatedListing
            // return newState3;
            return {...state}

        default:
            return state;

    }
}

export default spotsReducer