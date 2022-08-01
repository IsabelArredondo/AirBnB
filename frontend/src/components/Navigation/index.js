// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../LoginFormModal/signUpModal';
import './Navigation.css';
// import LoginForm from '../LoginFormModal/LoginForm';
import DemoUser from '../DemoUser';
import { signup } from '../../store/session';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div id="nav_right_div">
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (

      <div id="nav_right_div">
        <DemoUser />
        <div id="log_in_Button_div">   <LoginFormModal /></div>
        <div>   <SignupFormModal /></div>

        
        {/* <button className='signUpBttn' onClick={signUp}>Sign  Up</button> */}



      </div>
    );
  }

  return (
    <nav>
      <div id="navBar">
        <div id='logo_div'>
          <NavLink exact to="/">
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-logo.jpg"></img>
          </NavLink>
        </div>
        {isLoaded && sessionLinks}
      </div >


    </nav >
  );
}

export default Navigation;