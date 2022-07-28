// import { csrfFetch } from './csrf';


// const LOAD_reviews = 'reviews/load'

// const load = reviews => ({
//     type: LOAD_reviews,
//     reviews
// });



// export const getAllReviews = (id) => async (dispatch) => {
//     const response = await csrfFetch(`/reviews/${id}`)

//     if (response.ok) {
        
//         const reviews = await response.json();
//         console.log('this is reviews', reviews)
//         dispatch(load(reviews))
        
        
//     }
//   }


//  const initialState = {};

//  const reviewsReducer = (state = initialState, action) => {
//     let newState;
//     switch (action.type) {
//         case LOAD_reviews:
//              newState = {...state};
//             action.reviews.forEach((review) => {
//                 newState[review.id] = review
//             });
//             return {  newState };
       

    

//     }
// }

// export default reviewsReducer