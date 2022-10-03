import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './Signup.css'
import '../LoginFormModal/LoginForm.css'

function SignupFormPage({setShowSignUp}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const close = (e) => {
    e.preventDefault();

    setShowSignUp(false)

  };

  const demoUser = (e) => {
    e.preventDefault();
    setErrors([]);
    setEmail('john.smith@gmail.com');
    setPassword('secret password');
    dispatch(sessionActions.demoUsers()).catch(
        async (res) => {
            const data = await res.json();
            
            if (data && data.errors) setErrors(data.errors);
          
            
        }
    );
    setShowSignUp(false)
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      dispatch(sessionActions.signup({ email, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          setShowSignUp(false)
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div>
  <div className="closecontainer"><button className="buttonclose" onClick={close}><i className="fa-solid fa-x"></i></button><div className="logandsignheader">Sign Up or Demo User</div></div>

    <form className="Login_form" onSubmit={handleSubmit}>
      <ul id="sign_up_errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <h3 className="welcome">Welcome to Airbnb</h3>

      <label>
        
        <input
          id="email"
          className="input"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        
        <input
          id="midile"
          className="input"
        placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        
        <input
          id="midile"
          className="input"
        placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        
        <input
          id="midile"
          className="input"
        placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          id="password"
          className="input"
        placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <div className="policy">We’ll never call or text you to confirm your number. This is not a real website. No Privacy Policy</div>
      <button className="signUp" type="submit">Sign Up</button>
      <div className="orbox">
        <div className="orboxone"></div>
        <div className="or">OR</div>
        <div className="orboxtwo"></div>
      </div>
      <button id="demo" className="LogInBttn" type="button" onClick={demoUser}><div className="demobutton"><i className="fa-brands fa-airbnb"></i> <div id="demotext">Continue as Demo User</div></div></button>

    </form>
    </div>
  );
}

export default SignupFormPage;