// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logoImage from '../../Images/airbnbLogo.svg'
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  


  let sessionLinks;
  // if (sessionUser) {
    sessionLinks = (
      <div id="nav_right_div">
        <ProfileButton user={sessionUser} />
      </div>
    );
  // } else {
  //   sessionLinks = (

  //     <div id="nav_right_div">
  //       {/* <DemoUser />
  //       <div id="log_in_Button_div">   <LoginFormModal /></div>
  //       <div>   <SignupFormModal /></div> */}

        
  //       {/* <button className='signUpBttn' onClick={signUp}>Sign  Up</button> */}
  //       <ProfileButton  user={null}/>


  //     </div>
  //   );
  // }

  return (
    <nav>
      <div id="navBar">
        <div id='logo_div'>
          <NavLink exact to="/">
            <img className='logo' src={logoImage}></img>
          </NavLink>
        </div>
        {isLoaded && sessionLinks}
      </div >


    </nav >
  );
}

export default Navigation;