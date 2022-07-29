import { useState } from 'react';
import { createReview } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const CreateReview = ({spotId1}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');

    const sessionUser = useSelector((state) => state.session.user.id)
   

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newReview = {
            userId: sessionUser,
            spotId1,
            review,
            stars
        };

            return  dispatch(createReview(newReview, spotId1))
           
    }

    


    return (
        <form onSubmit={handleSubmit} className='createSpotForm' >

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
            <button type="submit">Create Review</button>
        </form>
    )
}

export default CreateReview
