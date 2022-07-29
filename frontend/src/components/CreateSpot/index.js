import { useState } from 'react';
import { createSpot } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


const CreateArea = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [price, setPrice] = useState('');

    const [errors, setErrors] = useState([]);


    if (!sessionUser) return <Redirect to="/signup" />;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateErrors = [];
        if (name.length < 1) validateErrors.push('Please add a title.');
        if (description.length < 1) validateErrors.push('Please include a description.');
        if (address.length < 1 || city.length < 1 || country.length < 1 || state.length < 1) validateErrors.push('adress required');
        if (lat.length < 1 || lng.length < 1) validateErrors.push('Please include a latitude and longitude.');
        if (price.length < 1) {
            validateErrors.push('Please include price.')
        } else if (price.length > 0) {
            if (Number(price) === 0) {
                validateErrors.push('Price must be more than $0')
            }
        }
        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }

        const newSpot = {
            name,
            description,
            address,
            city,
            state,
            country,
            lat,
            lng,
            price
        };

        const spotCreated = await dispatch(createSpot(newSpot))

        console.log('entire Spot', spotCreated, 'spot id', spotCreated.id)

        if (spotCreated) {

            history.push('/user/spots');

        }


    }

    return (
        <>


            <div className='createListingPage'>
                <h2> A new hosting journey starts here</h2>
                <p>Every Experience idea is reviewed by a small team at Airbnb. If your idea meets quality standards, you’ll get to add dates and start hosting.</p>

                <form
                    onSubmit={handleSubmit}
                    className="createListingForm">
                    <label>
                        <p>Create your title</p>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Lovely 3-bedroom vacation home
                                 with pool"
                            required={true}
                            onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label >
                        <p>Tell us about your place</p>
                        <textarea
                            type="text"
                            name="description"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>
                        <p>Where's your place located?</p>
                        <input
                            type="text"
                            name="address"
                            placeholder="address"
                            value={address}
                            required={true}
                            onChange={(e) => setAddress(e.target.value)} />
                    </label>
                    <div className="address" >

                        <input
                            type="text"
                            name="city"
                            placeholder="city"
                            value={city}
                            required={true}
                            onChange={(e) => setCity(e.target.value)} />

                        <input
                            type="text"
                            name="state"
                            placeholder="state"
                            value={state}
                            required={true}
                            onChange={(e) => setState(e.target.value)} />
                        <input
                            type="text"
                            name="country"
                            placeholder="country"
                            value={country}
                            required={true}
                            onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <label>
                        <p>Latitude</p>
                        <span className="lat-long" onClick={() => setLat(40.74877717256489)}>Latitude</span>
                        <input
                            type="number"
                            step="any"
                            name="lat"
                            required={true}
                            placeholder=" find coordinates on google maps"
                            value={lat}
                            onChange={(e) => setLat(Number(e.target.value))} />
                    </label>

                    <label>
                        <p>Longtitude</p>

                        <span className="lat-long" onClick={() => setLng(-74.00541429173198)} >Longtitude</span>
                        <input
                            type="number"
                            step="any"
                            name="lgt"
                            placeholder=" find coordinates on google maps"
                            value={lng}
                            required={true}
                            onChange={(e) => setLng(Number(e.target.value))} />
                    </label>

                    <label>
                        <p>Price per night</p>

                        <input
                            type="number"
                            step="any"
                            name="price"
                            placeholder="$00"
                            required={true}
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))} />
                    </label>
                    {errors && errors.map((error, idx) => <li key={idx} className="errorLi">{error}</li>)}
                    <button type="submit" className="create_btn">Create</button>
                </form>

            </div >


        </>
    )
};

export default CreateArea;