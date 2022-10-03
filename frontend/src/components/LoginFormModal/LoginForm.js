// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import faceprofile from "../../Images/face.png"
import './LoginForm.css'


function LoginForm({setShowLogIn}) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
      
    dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {

        const data = await res.json();
        setShowLogIn(false)
        if (data && data.errors) setErrors(data.errors);
      }
    )
    setShowLogIn(false)

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
      setShowLogIn(false)

  };

  const close = (e) => {
    e.preventDefault();

    setShowLogIn(false)

  };

  return (
       <div>    
  <div className="closecontainer"><button className="buttonclose" onClick={close}><i className="fa-solid fa-x"></i></button><div className="logandsignheader">Log in or Demo User</div></div>

    <form className="Login_form" onSubmit={handleSubmit}>

      <ul className="Errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>      

      <h3 className="welcome">Welcome to Airbnb</h3>
      <label>
       
        <input
          id="email"
          className="input"
          type="text"
          placeholder="Email Adress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        
        <input
          id="password"
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div className="policy">We’ll never call or text you to confirm your number. This is not a real website. No Privacy Policy</div>
      <button className="LogInBttn" type="submit">Continue</button>
      <div className="orbox">
        <div className="orboxone"></div>
        <div className="or">OR</div>
        <div className="orboxtwo"></div>
      </div>  
      <button id="demo" className="LogInBttn" type="button" onClick={demoUser}><div className="demobutton"><i className="fa-brands fa-airbnb"></i> <div id="demotext">Continue as Demo User</div></div></button>
      <a id="git" className="LogInBttn" href="https://github.com/IsabelArredondo" target="_blank"><div className="gitbutton"><i class="fa-brands fa-github"></i> <div id="demotext">Continue to Developer's GitHub</div></div></a>
      <a id="git" className="LogInBttn" href="https://www.linkedin.com/in/isabelarredondo-1107a9186/" target="_blank"><div className="gitbutton"><i class="fa-brands fa-linkedin-in"></i> <div id="demotext">Continue to Developer's Linkedin</div></div></a>
      <a id="git" className="LogInBttn" href="https://isabelarredondo.github.io/" target="_blank"><div className="gitbutton"><img className="faceprofile" src={faceprofile}></img> <div id="demotext">Continue to Developer's Website</div></div></a>

      
    </form>
    </div> 
  );
}

export default LoginForm;