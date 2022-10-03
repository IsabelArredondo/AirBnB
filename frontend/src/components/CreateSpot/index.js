import { useState, useEffect } from 'react';
import { createSpot, getAllSpots } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './createAspot.css'


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
    const [previewImage, setPreviewImage] = useState('')
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
        } 
            if (Number(price) === 0) {
                validateErrors.push('Price must be more than $0')
            }
        
        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }

        const newSpot = {
            name: name,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            previewImage: previewImage,
            description: description,
            price: price
        };

        history.push('/user/spots');
        return dispatch(createSpot(newSpot))


    }




    return (
        <>
            <div className='createcontainerspot'>
                
                <div className='creategraphic'>
                <Link to={`/`} className="spot-link" ><i className="fa-brands fa-airbnb" id='createspot'></i> </Link>

                    
                
                    <h1 className='wwx'>Welcome Back,   {`${sessionUser.firstName}`}</h1>
                    
                    
                </div>

            <div className='createSpotPage'>
                <h2> Your hosting journey starts here</h2>


                <form

                    onSubmit={handleSubmit}
                    className="createSpotForm">
                    {errors ?? (
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <label>
                        <p>Create your title</p>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Two bedroom home
                                 near the water"
                            required={true}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label >
                        <p>Tell us about your place</p>
                        <input
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
                            id='location'
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
                        <p>Latitude:</p>
                        <input
                            type="number"
                            step="any"
                            name="lat"
                            required={true}
                            placeholder=" find coordinates"
                            value={lat}
                            onChange={(e) => setLat(Number(e.target.value))} />
                    </label>
                    <label>
                        <p>Longtitude:</p>

                        <input
                            type="number"
                            step="any"
                            name="lgt"
                            placeholder=" find coordinates"
                            value={lng}
                            required={true}
                            onChange={(e) => setLng(Number(e.target.value))} />
                    </label>
                    <label>
                        <p>Preview Image:</p>
                        <input
                            type="text"
                            placeholder='url'
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <p>Price per night:</p>

                        <input
                            type="number"
                            step="any"
                            name="price"
                            placeholder="$00"
                            required={true}
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))} />
                    </label>
                    <button type="submit" className="create">Create</button>
                </form>

            </div >
            </div>


        </>
    )
};

export default CreateArea;