import { csrfFetch } from './csrf';


const CREATE = 'reviews/createReview'
const LOAD_REVIEWS = 'reviews/load'
const DELETE = 'spots/delete-review'


const loadReviews = (payload) => ({
    type: LOAD_REVIEWS,
    payload,

});

const create = (newReview) => ({
    type: CREATE,
    newReview,

})

export const createReview = (data, spotId) => async (dispatch) => {

    const response = await csrfFetch(`/reviews/${spotId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });


    const newReview = await response.json();
    dispatch(create(newReview));
    return newReview


};

export const getAllReviewsBySpotId = (id) => async (dispatch) => {
    const response = await csrfFetch(`/reviews/${id}`)

    if (response.ok) {

        const payload = await response.json();

        //console.log('this is reviews', payload)

        dispatch(loadReviews(payload))



    }
}

const deleteReview = (id) => {
    return {
        type: DELETE,
        id,
    };
};

export const reviewDelete = (id) => async (dispatch) => {
    const response = await csrfFetch(`/reviews/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            id,
        }),
    });
    if (response.ok) {
        const res = await response.json();
        dispatch(deleteReview(res));
        return res;
    }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case LOAD_REVIEWS:
            newState = { ...state };
            action.payload.forEach((review) => { newState[review.id] = review });
            return { ...newState };

        case CREATE:
            console.log("ACTION ITEM", state);
            newState = { ...state }
            newState[action.newReview.id] = action.newReview

            console.log("ACTION ", newState);
            return newState;

        case DELETE: {
             newState = { ...state };
            delete newState[action.id];
            return newState;
        }

        default:
            return state;
    }
}

export default reviewsReducer