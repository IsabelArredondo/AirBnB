import { useState } from 'react';
import { createReview } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const CreateReview = ({spotId1}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);
    

    const sessionUser = useSelector((state) => state.session.user.id)
   


    const handleSubmit = async (e) => {
        e.preventDefault()
        let validateErrors = [];
        if (review.length < 5) validateErrors.push('Review must be longer than 5 characters');
        if (stars < 1) validateErrors.push('Please enter a rating')

        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }

        const newReview = {
            userId: sessionUser,
            spotId1,
            review,
            stars
        };
            //history.push(`/spots/${spotId1}`);
            
              dispatch(createReview(newReview, spotId1))
            

    }
    


    return (
        <form onSubmit={handleSubmit} className='createSpotForm' >
            <ul> {errors.map((error, i) => ( <li key={i}>{error}</li>))}</ul>
            <label>
                Review:
                <input
                    type="text"
                    placeholder='Tell us how your stay was'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </label>
            <label>
                stars:
                <input
                    type="text"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                />
            </label>
            <button  type="submit">Post your Review</button>
        </form>
    )
}

export default CreateReview
